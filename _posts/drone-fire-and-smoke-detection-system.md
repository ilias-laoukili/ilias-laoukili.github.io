## Project Overview: Dravion
In response to the growing threat of forest fires, the "Dravion" project integrates a specialized software system for real-time environmental surveillance.

Technical Implementation

The project utilizes a dedicated Python script, fire_detection.py. Unlike the person detection module, this does not rely on AI but employs classic HSV color space conversion and masking to identify "foyers lumineux" (bright hotspots) typical of flames.

Detection Process

    Conversion: RGB to HSV color space.

    Masking: Applying masks centered on red, orange, and yellow hues.

    Thresholding: Filtering out noise; only areas >500px are flagged.

Output

Detected fires are framed with a rectangle, and coordinates are transmitted in JSON format to the main interface for real-time video overlay.