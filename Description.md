Description
===========
Task organization
-----------------

## Part 1: Sentence & Dependency Path
### Sentence visualization

Here's what it would look like

![Sentence 1](http://i.imgur.com/E7bCdVY.jpg "Sentence1")

or 

![Sentence 2](http://i.imgur.com/8qhJKqI.jpg "Sentence2")

### Path visualization

The Path between two candidate arguments is calculated by Dijkstra's algorithm and could be given or re-calculated (in this case, we need the list of valid relations). 

Here's the paths HIGHLIGHTED for two candidate relations in Sentences 1 and 2.

Sentence 1 with Candidate Relation highlighted
![Sentence 1 Candidate 1](http://i.imgur.com/j4IFLlp.jpg "Sentence1 Cand1")

and for Sentence2, with one Candidate Relation highlighted

![Sentence 2 Candidate 1](http://i.imgur.com/5HHlE56.jpg "Sentence2 Cand1")

A cleaner view would be to show the paths only:

Sentence 1:
![Sentence 1 path only](http://i.imgur.com/CaNDmyM.jpg "Sentence 1 Path only")

and Sentence 2:
![Sentence 2 path only](http://i.imgur.com/uSRKctH.jpg "Sentence 2 Path only")


## Part 2: Alignment Visualization

The alignment will be calculated by AlvisRE (external) and then provided to this tool, by a query with arguments like (FileName, SentID, Arg1, Arg2), all of which are known to this tool.

The simplest case in visualizing such an alignment is when in both sentences the arguments are found in the same order. That is to say, like in the examples given here, Bacteria1 is before Habitat1 in both sentences. When there is an inversion, we need to think about how to visaulize this best.

In the case where there is no inversion in the order of arguments, here's what such an alignment viz might look like.

![Sentence1-2 aligmnent](http://i.imgur.com/1FUzhwr.jpg "Alignment of Sent1 and Sent2")



