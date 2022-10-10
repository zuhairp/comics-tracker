import subprocess
import re

text = ""

pattern = re.compile(r"([a-zA-Z \-:\.\']+) (\d+) ?(\d+)?")

while True:
    data = input(">> ")
    if data == "quit":
        break

    result = pattern.match(data)
    if result:
        title = result.group(1).strip()
        start = int(result.group(2))
        end   = result.group(3)

        if not end:
            end = start
        
        end = int(end)

        print(f"Adding '{title}' issues #{start} through #{end}")

        rows = [f"{title}\t{number}" for number in range(start, end+1)]

        text += "\n".join(rows)
        text += "\n"

        subprocess.run("clip", universal_newlines=True, input=text)

# subprocess.run("pbcopy", universal_newlines=True, input=text)
subprocess.run("clip", universal_newlines=True, input=text)
print("Table copied to clipboard")