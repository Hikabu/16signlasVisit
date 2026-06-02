from PIL import Image
import json

img = Image.open("background.jpg")

img = img.resize((256, 256))

img = img.convert("P", palette=Image.ADAPTIVE, colors=16)

pixels = list(img.getdata())

data = {
    "width": img.width,
    "height": img.height,
    "cells": pixels
}

with open("density-map.json", "w") as f:
    json.dump(data, f)