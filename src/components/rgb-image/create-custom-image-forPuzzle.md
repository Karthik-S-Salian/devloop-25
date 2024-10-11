# FOR DEVELOPERS

Use the following Python function in Colab to get the coded image and pass the image to the component:

```python
import cv2
import numpy as np

# Load the image
image = cv2.imread('speaking.jpeg')

# Split the image into its RGB components
B, G, R = cv2.split(image)

# Define the text and position
text = 'Hidden Message'
position = (50, 50)
font = cv2.FONT_HERSHEY_SIMPLEX
font_scale = 0.8
thickness = 2

# Add text to each channel in different colors
cv2.putText(R, text, position, font, font_scale, (255, 255, 0), thickness, cv2.LINE_AA)  # Cyan text in the Red channel
cv2.putText(G, text, position, font, font_scale, (255, 0, 255), thickness, cv2.LINE_AA)  # Magenta text in the Green channel
cv2.putText(B, text, position, font, font_scale, (0, 0, 255), thickness, cv2.LINE_AA)  # Blue text in the Blue channel

# Merge the channels back
image_with_text = cv2.merge([B, G, R])

# Save the final image
cv2.imwrite('image_with_hidden_text.jpg', image_with_text)
