from manim import *
import numpy as np
import random

class AssessedFurniture(Scene):
    def construct(self):
        self.camera.background_color = "#E1D1C0"
        
        # Title setup
        title1 = Text("ASSESSED VALUE OF HOUSEHOLD AND KITCHEN FURNITURE", 
                     font="Garamond", font_size=22, color=BLACK)
        title2 = Text("OWNED BY GEORGIA NEGROES", 
                     font="Garamond", font_size=22, color=BLACK)
        title1.to_edge(UP, buff=0.3)
        title2.next_to(title1, DOWN, buff=0.1)
        
        data_lines = [
            ("1875", 21186, "$"),
            ("1880", 498532, "$"),
            ("1885", 736170, "''"),
            ("1890", 1173624, "''"),
            ("1895", 1322694, "''"),
            ("1899", 1434975, "''")
        ]
        
        dashes_count = [6, 4, 4, 1, 1, 1]
        angles = [6, 162, 242, 445, 555, 674]
        
        # Colors for each segment
        arc_colors = [
            "#E8B0A4",
            "#9DA0B3",
            "#BC997F",
            "#F1B240",
            "#D7C8B2",
            "#E03448"
        ]

        def darken_color(color_hex, factor=0.8) :
            color = hex_to_rgb(color_hex)
            darker_color = np.array(color) * factor
            return rgb_to_color(darker_color)
        
        # Set up the legend texts
        legend_group = VGroup()
        for i, (year, value, symbol) in enumerate(data_lines):
            dashes = '-' * dashes_count[i]
            text = Text(f"{year} {dashes} {symbol}{value:,}", 
                       font="Garamond", font_size=12, color=BLACK)
            legend_group.add(text)

        legend_group.arrange(DOWN, buff=0.06, aligned_edge=LEFT)
        legend_group.next_to(title2, DOWN, buff=0.6).align_to(title2, LEFT)
        
        legend_right = legend_group.get_right()       
        spiral_center = np.array([legend_right[0] + 0.25, -1.75, 0])
               
        # Create spiral visualization
        spiral_group = VGroup()
        start_radius = 3.00
        current_angle = 90 * DEGREES

        start_point = spiral_center + np.array([start_radius, 0, 0])           

        for i, (year, value, symbol) in enumerate(data_lines):
            angle_extent = angles[i] * DEGREES
            angle_rad = -angle_extent
            
            rotations = angles[i] / 360
            radius_decrease = start_radius * 0.5 * rotations
            last_two_digits = year[-2:]


            def spiral_func(t):
                theta = current_angle + t * angle_rad
                r = start_radius - t * radius_decrease
                x = r * np.cos(theta)
                y = r * np.sin(theta)
                return spiral_center + np.array([x, y, 0])

            spiral_segment = ParametricFunction(
                spiral_func,
                t_range=[0, 1],
                color=arc_colors[i],
                stroke_width=2
            )

            darkened_color = darken_color(arc_colors[i], factor=0.6)

            text_group = VGroup()
            for _ in range(3):
                num_text = Text(last_two_digits, font="Garamond", font_size=14, color=darkened_color)

                random_position_on_path = random.uniform(0, 1)
                num_text.move_to(spiral_func(random_position_on_path))

                def random_move(mob):
                    random_position_on_path = random.uniform(0, 1)
                    mob.move_to(spiral_func(random_position_on_path) + np.array([random.uniform(-0.1, 0.1), random.uniform(-0.1, 0.1), 0]))
                    return mob
                
                num_text.add_updater(random_move)
                text_group.add(num_text)

            spiral_group.add(spiral_segment, text_group).shift(UP* 0.2)
        
            current_angle += angle_rad

        # Add all elements to the scene
        self.add(title1, title2, spiral_group, legend_group)