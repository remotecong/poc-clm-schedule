import sys
import json

if __name__ == "__main__":
  data = {
    "talks": [],
  }
  current_assignment = None

  for line in sys.stdin:
    line = line.strip()
    if line.startswith("=>") and current_assignment:
        current_assignment["assignees"].append(line[2:])
    elif line.startswith("<=>"):
        data["date"] = line[3:]
    elif line.startswith("[=]"):
        data["talks"].append({ "song": line[8:] })
    elif line.startswith("( )"):
        if current_assignment:
            data["talks"].append(current_assignment)

        current_assignment = { "title": line[4:], "assignees": [] }

  print(json.dumps(data))


