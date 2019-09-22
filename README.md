# mapgen
Generates a .dot File from the th uumap File.
## Required Packages
- node
- typescript
- graphviz dot compiler
## Installation
	clone this repo
	npm install
	tsc
## Usage
Create the Temporary File for the dot generator

	node dist/createtmpjson.js -i thuumapfile -o tmpfile

Create the .DOT File

	node dist/createdot.js -i tmpfile -o output.dot

Now you should have a .DOT File. There is an example compile.sh script which will render a DOT File. You probably have to tweak the Parameters to get it to work. Some DOT Compilers do not render such large .DOT Files.
Example:

	./compile.sh -i output.dot -o mymap.svg -Tsvg
	./compile.sh -i output.dot -o mymap.png -Tpng
