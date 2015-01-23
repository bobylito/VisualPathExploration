## General rules
### What we will find in the data
They contain 
* Sentences (defined by character limits)
* Words (defined by character limits)  *Note: for reasons not covered here, some words might actually be multi-word groups, or punctuation. In reality this could be considered as "Tokens" in NLP talk*
* Entities which are groups of (1+) words and will serve as arguments to the relations/paths we will later try and visualize
* Relations between the above.



### Format
Each file contains various entries (elements) and each line defines one element.
For making sense of the file format, keep in mind there exit two type of lines

* Lines starting with a T, describe "text bound" elements, like words, sentences etc, and make reference to the character index limits on which they are applied.
* Lines starting with a R, describe relations between text bound elements. 

All lines start like this:

ID  TYPE

The columns are tab-separated.

#### Text bound 
The format of each line follows the following pattern (separated by tabs):

ID  TYPE    CSTART  CEND    SURFACE[|Extra Info]*

Where 
* ID is the Tx ID
* TYPE can be: Sentence, Word, or other. The first two are reserved for sentences and words, but any other type listed will be considered as an entity type.
* CSTART, CEND is the character start and end respectively
* SURFACE is the 'surface form' or to put it simply, the characters corresponding to this text-bound. 
* The optional Extra Info depends on each type (see below)

Extra Info contains sub-columns separated by "|".

##### Sentence
Sentences do not have extra info, but have a more complex ID. Let us start with an example:

`T4-BTID-10088	Sentence 59 227	This organism is the causative agent of Lyme disease, a multisystemic disease that is considered to be the most prevalent tick-born disease in North America and Europe.`

* T4 means this is the 4th sentence
* BTID-10088 is actually the iname of the document this sentence comes from (and it also happens to be the filename of the input that includes this sentence).


##### Word
Words can have extra information in layers. Here is some examples, again:

`T27	Word 104 111	disease|disease|NN`

`T28	Word 111 112	,|,|,`

The first 4 columns are standard. In the last column we find first the surface form (disease and ","). Then, separated by "|" we find first the canonical form (lemma) and the POS tag. In the case there is extra parts they will follow the format "layername=value", but we can ignore this for now.

##### Entities

Examples:

`T2	Bacteria 37 57	Borrelia burgdorferi|Borrelia_burgdorferi`

`T3	Habitat 181 185	tick|tick`

`T4	Geographical 202 215	North America|North America`

More or less the same as with words, only there is no POS tag, just surface and canonical.


#### Relations

Relations can be a bit more complicated, but follow a strict format:
Again the lines start by:
ID TYPE

* ID is Rx
* TYPE is either Dependency, Anaphora or another type. As with entities, this is arbitrary and anything that is not a Dependency or an Anaphora is a (semantic) relation type.


##### Dependencies
Syntactic dependencies are directed relationships. Their arguments are a dependent and a head, referenced by ther Tx ID. They also have a label, i.e. a their dependency type.
Example:

`R1	Dependency dependent:T19 sentence:T4-BTID-10088 head:T20 label:det`

##### Anaphora
Anaphora or co-references are actually relationships between an Entity and a part of text (one or more words). They have two arguments, the Anaphor which is in the form of CSTART-CEND, and the Ante which is an entity, referenced by its Tx ID.

Example:

`R154	Anaphora Anaphor:59-72 Ante:T2`


##### Semantic Relations
Despite the fact that the exhaustive list of relation types is not known beforehand (*for this tool, for now*), semantic relationships are rather straight-forward. They only ever have **two** arguments, and these are declared in the format of ROLE:Tx
Semantic Relations are also directed.

Example:

`R150	Localization Bacterium:T2 Localization:T4`

So this, for example, defines a relation of type Localization between the entity T2 as the "Bacterium" argument, and T4 as the "Localization" argument.





PS. All examples above are taken from `BTID-10088.a` which can be found in the `data` folder. 
