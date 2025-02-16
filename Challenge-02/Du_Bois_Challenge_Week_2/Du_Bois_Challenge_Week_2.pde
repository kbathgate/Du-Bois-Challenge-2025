Table table;
int barHeight = 12;
int padding = 8;
int buffer = 30;
int maxBarWidth;
int titleHeight = 50; // Height for the title area
int totalRows;
int currentRow = 0; // Track the current row being animated
int frameDelay = 10; // Delay between frames to animate the bars
boolean allDisplayed = false; // Flag to check if all rows have appeared

void setup() {
  size(800, 600); 
  table = loadTable("data.csv", "header"); 
  totalRows = table.getRowCount();
  maxBarWidth = width - 150;

  background(#efe2d5); 
}

void draw() {
  background(#efe2d5); 

  // Draw the title
  textSize(20);
  textAlign(CENTER);
  fill(0);
  text("ACRES OF LAND OWNED BY NEGROES \nIN GEORGIA.", width / 2, titleHeight - 10);

  // Animate the rows one by one
  for (int i = 0; i <= currentRow; i++) {
    // Get the year and acres data
    int year = table.getInt(i, "Date");
    float acres = table.getFloat(i, "Land");

    // Set the bar width based on acres
    float barWidth = map(acres, 0, 1100000, 0, maxBarWidth); 

    // Draw the bar
    fill(#ea3453); 
    noStroke();
    rect(100, titleHeight + buffer + i * (barHeight + padding), barWidth, barHeight);

    // Draw the year labels in the middle of the bars
    fill(0);
    textSize(13);
    textAlign(CENTER);
    text(year, 70, titleHeight + buffer + i * (barHeight + padding) + barHeight / 2); 

    // Format the acres number with commas
    String acresStr = formatNumberWithCommas((int) acres);

    // Change color of acre values once all rows are displayed
    if (allDisplayed && i != 0 && i != totalRows - 1) {
      fill(#ea3453); // Hide the text by matching bar color
    } else {
      fill(0); // Black for visible text
    }

    // Display acres value in the center of the bar
    textSize(12);
    textAlign(CENTER, CENTER);
    text(acresStr, 100 + barWidth / 2, titleHeight + buffer + i * (barHeight + padding) + barHeight / 2);
  }

  // Animate the rows one by one
  if (frameCount % frameDelay == 0 && currentRow < totalRows - 1) {
    currentRow++;
  }

  // Once all rows are displayed, mark that stage
  if (currentRow == totalRows - 1 && !allDisplayed) {
    allDisplayed = true;
  }
}

// Helper function to format numbers with commas (for large numbers)
String formatNumberWithCommas(int number) {
  return String.format("%,d", number);
}
