import bpy
import json
import os

obj = bpy.context.active_object

vertices = [v.co for v in obj.data.vertices]

faces = [[v for v in f.vertices] for f in obj.data.polygons]

dimensions = obj.dimensions

object_name = obj.name

data = {
    "x": [v.x for v in vertices],
    "y": [v.y for v in vertices],
    "z": [v.z for v in vertices],
    "i": [f[0] for f in faces],
    "j": [f[1] for f in faces],
    "k": [f[2] for f in faces],
    "dimensions": [dimensions.x, dimensions.y, dimensions.z],
    "object_name": object_name
}

output_directory = "C:/Users/phili/Documents/"

json_filename = os.path.join(output_directory, f"{object_name}.json")

with open(json_filename, "w") as json_file:
    json.dump(data, json_file, indent=4)
 
print(f"JSON file '{json_filename}' generated successfully.")