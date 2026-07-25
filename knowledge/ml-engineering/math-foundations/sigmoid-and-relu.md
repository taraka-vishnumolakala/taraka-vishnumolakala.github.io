---
title: "Sigmoid & ReLU"
description: "See how two small functions reshape a neuron’s raw number, and why neural networks use them in different places."
category: ml-engineering
section: math-foundations
pubDate: 2026-07-25
topics:
  - activation functions
  - neural networks
  - sigmoid
  - ReLU
---

Imagine that your team is building a model to help review files uploaded to a
company network. The model looks at signals such as whether a file is signed,
which program created it, and whether it starts an unexpected network
connection.

Inside the model, a **neuron** combines several incoming numbers into one new
number. You can think of a neuron as a very small calculator: it multiplies each
input by an adjustable value, adds the results, and produces a raw score.

Suppose one neuron produces a raw score of `2`. What should the next part of the
network receive?

It could receive `2` unchanged, but a neural network usually applies one more
rule first. That rule is called an **activation function**. It transforms the
raw score before passing the result onward.

Sigmoid and ReLU are two activation functions. They receive the same kind of
input, but they transform it for different purposes.

## Why the network needs another function

Multiplication and addition can express useful relationships, but they can only
build straight lines and flat boundaries. Stacking more layers of multiplication
and addition does not remove that limit. The whole stack can still be rewritten
as one larger multiply-and-add calculation.

An activation function changes the shape between layers. It lets later neurons
combine bends, corners, and regions instead of only straight relationships.
This property is called **non-linearity**.

The term sounds abstract, but the practical idea is simple:

> An activation function stops a deep network from behaving like one large
> straight-line calculation.

## Sigmoid turns a raw score into a 0-to-1 value

The **sigmoid function** takes any number and returns a value between `0` and
`1`.

| Raw score | Sigmoid output |
| ---: | ---: |
| `−6` | about `0.002` |
| `−2` | about `0.119` |
| `0` | exactly `0.500` |
| `2` | about `0.881` |
| `6` | about `0.998` |

Large negative scores move close to `0`, large positive scores move close to
`1`, and a score of `0` lands in the middle. The output approaches `0` and `1`
but never reaches either endpoint exactly.

The formula is:

`sigmoid(x) = 1 / (1 + e⁻ˣ)`

Here, `x` is the raw score. The letter `e` is a fixed mathematical number,
roughly `2.718`. You do not need to calculate the formula by hand to understand
the function. Its S-shaped curve is the important part.

Sigmoid is often used at the final output of a model that answers a two-way
question, such as “Does this file look malicious?” The value can then be read
as the model’s estimated chance for one of the two answers.

That does not make the value a verified probability. The model must be trained
with an appropriate loss function, and its scores should be checked against
new data. A sigmoid output of `0.90` is still a model estimate, not proof that a
file is malicious.



Try sigmoid first. Move the input from `−8` to `8` and notice three parts of the
curve:

1. Near the middle, a small input change produces a visible output change.
2. At the far left, the output is already close to `0`.
3. At the far right, the output is already close to `1`.

The nearly flat ends matter during training. The local slope of a function is
called its **gradient**. On the flat ends of sigmoid, the gradient is close to
zero, so very little learning signal passes backward through that neuron.

When this happens across many layers, the signal can become too small for early
layers to learn effectively. This is called the **vanishing gradient problem**.

## ReLU blocks negative scores and passes positive scores

The **rectified linear unit**, usually shortened to **ReLU**, follows an even
simpler rule:

`ReLU(x) = max(0, x)`

The function compares the input with zero and returns whichever is larger.

| Raw score | ReLU output |
| ---: | ---: |
| `−6` | `0` |
| `−2` | `0` |
| `0` | `0` |
| `2` | `2` |
| `6` | `6` |

Negative inputs become `0`. Positive inputs pass through unchanged. ReLU does
not squeeze its result into a percentage, and it does not make a
safe-or-malicious decision.

Select **ReLU** in the interactive graph. The left side is a flat line at zero,
while the right side is a straight ramp. On the ramp, changing the input by
`1` changes the output by `1`. That steady slope helps a learning signal pass
through many layers.

This is why ReLU and related functions are commonly used inside deep networks.
They are simple to calculate and do not flatten on the positive side.

## The trade-off behind a dead ReLU

ReLU is flat for every negative input. Its gradient on that side is zero, so a
neuron that stays negative receives no useful signal through the ReLU.

If training leaves the neuron on that side for every example, it keeps
returning `0` and may stop contributing to the model. Engineers call this a
**dead ReLU**.

This failure is not visible from the model’s final accuracy alone. During
development, teams can inspect activation values and watch for neurons that
return zero for nearly every example. Related functions such as Leaky ReLU keep
a small slope on the negative side to reduce this risk.

## Compare their jobs

| Question | Sigmoid | ReLU |
| --- | --- | --- |
| What does it return? | A value between `0` and `1` | `0` for negative inputs; the original value for positive inputs |
| What shape does it make? | A smooth S-shaped curve | A flat line followed by a straight ramp |
| Where is it often used? | The output of a two-way classifier | Hidden layers inside a network |
| Where does its gradient become small or zero? | At both far ends | On the negative side |
| What should you remember? | Its output is an estimate, not proof | Its positive output is not a probability |

These are common uses, not rules that every model must follow. Modern
architectures also use related activation functions such as GELU and SiLU.

## Implement both functions in Python

The code below applies sigmoid and ReLU to the same three raw scores:

```python
import math


def sigmoid(x):
    """Transform any number into a value between 0 and 1."""
    return 1 / (1 + math.exp(-x))


def relu(x):
    """Block negative values and pass positive values through."""
    return max(0.0, x)


for score in [-2.0, 0.0, 2.0]:
    print(
        f"score={score:>4.1f}  "
        f"sigmoid={sigmoid(score):.3f}  "
        f"relu={relu(score):.3f}"
    )
```

Running it produces:

```text
score=-2.0  sigmoid=0.119  relu=0.000
score= 0.0  sigmoid=0.500  relu=0.000
score= 2.0  sigmoid=0.881  relu=2.000
```

`math.exp(-x)` calculates the `e⁻ˣ` part of the sigmoid formula. Production
machine-learning code normally uses library implementations that also handle
very large positive or negative inputs safely.

## How they fit into one classifier

A network can use both functions in different places:

1. The file’s signals enter the first layer as numbers.
2. A neuron combines those numbers into a raw score.
3. ReLU transforms that score before sending it to another hidden layer.
4. Later layers repeat the process and build more useful internal patterns.
5. A final neuron produces one raw classification score.
6. Sigmoid turns that last score into a value between `0` and `1`.
7. The surrounding security system applies a reviewed threshold and other
   controls before taking action.

The raw score entering the final sigmoid is sometimes called a **logit**. A
logit can be any number; sigmoid is what maps it into the 0-to-1 range.

## Why security engineers should care

A model score should be one input to a security decision, not the entire
decision.

- A threshold such as `0.80` creates a trade-off. Lowering it may catch more
  malicious files but also block more harmless ones. The threshold should be
  tested against realistic data and the cost of both mistakes.
- A high sigmoid output can still be wrong. New attacker behavior, changes in
  normal software, or deliberately modified inputs can move the model into
  conditions that its training data did not represent.
- Monitoring only the final output can hide internal failures. Activation
  distributions can reveal layers that are saturated near sigmoid’s flat ends
  or ReLU neurons that remain at zero.

## Common wrong ideas

- **“Sigmoid converts any score into a trustworthy probability.”** It creates
  the right numerical range, but training quality and validation determine
  whether the number matches real-world outcomes.
- **“ReLU returns only zero or one.”** It returns zero for a negative input, but
  it preserves the full value of a positive input. `ReLU(7)` is `7`.
- **“A negative neuron score means the file is safe.”** The meaning of an
  internal score comes from learned model parameters. ReLU only applies its
  numerical rule.
- **“One function is better everywhere.”** Sigmoid and ReLU are useful for
  different jobs, and other activation functions may suit a model better.

## Check your understanding

#### 1. What does an activation function do?

It transforms a neuron’s raw score before passing the result to the next part of
the network. This transformation lets a deep network represent relationships
that a stack of multiplication and addition alone cannot represent.


#### 2. What does sigmoid return when its input is zero?

It returns `0.5`, the midpoint of its 0-to-1 range.


#### 3. What does ReLU return for an input of −3? What about 3?

It returns `0` for `−3` and returns `3` for `3`. Negative values are blocked;
positive values pass through unchanged.


#### 4. Why can sigmoid slow learning at very large inputs?

Its curve becomes almost flat at both ends. A flat curve has a gradient close
to zero, so only a small learning signal passes backward through the neuron.


#### 5. Does a sigmoid output of 0.95 prove that a file is malicious?

No. It reports the model’s estimate. The estimate can be wrong, poorly
calibrated, or based on inputs unlike the data used during training.


## Keep this mental model

> Sigmoid squeezes a raw score into the space between 0 and 1. ReLU turns
> negative scores into zero and lets positive scores pass through.

## Additional practice

NeetCode’s Sigmoid and ReLU problem
