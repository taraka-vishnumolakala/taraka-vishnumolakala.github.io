---
title: "Linear Regression (Forward Pass)"
description: "Follow a linear model from one input through multiplication and addition to a numerical prediction."
category: ml-engineering
section: math-foundations
pubDate: 2026-07-25
topics:
  - linear regression
  - forward pass
  - model parameters
  - prediction
---

Imagine that your security operations team wants to estimate how much
investigation effort an alert may require. One useful input is the number of
endpoints affected by the alert.

We will measure effort in **analyst-hours**. One analyst-hour means one hour of
work by one analyst.

We will build the smallest possible model:

`estimated analyst-hours = analyst-hours per endpoint × affected endpoints + baseline analyst-hours`

Suppose the model currently uses:

- `1.5` analyst-hours for each affected endpoint, and
- `2` baseline analyst-hours for initial triage, coordination, and reporting.

For an alert affecting `8` endpoints, the estimate is:

`1.5 × 8 + 2 = 14 analyst-hours`

That multiply-and-add calculation is a **forward pass**. The input moves forward
through the model and produces a prediction.

Nothing learns during this calculation. The model does not compare its answer
with the real investigation time or change any of its internal values. It only
uses the values it already has to produce an answer.

## Read the linear regression formula

The same model is usually written as:

`ŷ = wx + b`

Each symbol has a specific job:

| Symbol | Name | Meaning in this example |
| --- | --- | --- |
| `x` | Input | Number of affected endpoints |
| `w` | Weight | Estimated analyst-hours added for each endpoint |
| `b` | Bias | Baseline analyst-hours added to every estimate |
| `ŷ` | Prediction | Estimated investigation effort in analyst-hours |

The mark above `y` is read as “y hat.” It reminds us that `ŷ` is an estimate,
not the actual observed value.

The weight and bias are the model’s **parameters**. A parameter is an adjustable
number inside the model. Training tries to find parameter values that make
useful predictions. A forward pass simply uses the current parameters.

## Why this is called linear regression

**Regression** means that the model predicts a numerical amount, such as hours,
cost, or volume. It is different from classification, where a model chooses a
class such as malware or misconfiguration.

**Linear** means the relationship draws a straight line:

`ŷ = 1.5x + 2`

The weight controls the line’s slope. A weight of `1.5` means the estimate rises
by `1.5` analyst-hours whenever the endpoint count rises by one.

The bias controls the line’s starting height. When `x = 0`, the model still
returns `2` baseline analyst-hours:

`1.5 × 0 + 2 = 2`

In this example, that effort represents work that does not depend on the number
of endpoints. The mathematical term **bias** means this fixed offset. It does
not mean unfairness or social bias.



Start with `8` endpoints, a weight of `1.5`, and a bias of `2`. The graph shows
the same `14`-hour calculation we followed above.

Now change one control at a time:

1. Raise the affected endpoint count. The dot moves along the existing line.
2. Raise the weight. The line becomes steeper because every endpoint adds more
   analyst-hours.
3. Raise the bias. The entire line moves upward because the same baseline is
   added to every prediction.

The controls change different parts of the calculation. The input chooses a
position on the line, while the parameters determine the line’s shape and
starting point.

## Follow another prediction

Suppose the next alert affects `12` endpoints. The model parameters stay the
same:

`x = 12`

`w = 1.5`

`b = 2`

First multiply the input by the weight:

`1.5 × 12 = 18`

Then add the bias:

`18 + 2 = 20`

The forward pass returns:

`ŷ = 20 analyst-hours`

This result is a prediction. We would need the completed investigation’s actual
effort before we could measure how wrong the prediction was.

## Keep track of the units

The units provide a useful correctness check:

`analyst-hours per endpoint × endpoints = analyst-hours`

Then the model adds the baseline effort:

`analyst-hours + analyst-hours = analyst-hours`

The units match, so the final answer is expressed in analyst-hours. If a
calculation tried to add an endpoint count directly to a number of
analyst-hours, that would signal a modeling or implementation mistake.

## Add more than one input

Real investigations depend on more than the endpoint count. A model might also
use the number of affected accounts, cloud services, or security controls.

Each input used by a model is called a **feature**. A linear model gives every
feature its own weight:

`ŷ = w₁x₁ + w₂x₂ + ... + b`

For example:

- `x₁ = 8` affected endpoints with `w₁ = 1.5` analyst-hours per endpoint,
- `x₂ = 2` affected accounts with `w₂ = 0.75` analyst-hours per account, and
- `b = 2` baseline analyst-hours.

The forward pass becomes:

`ŷ = 1.5 × 8 + 0.75 × 2 + 2`

`ŷ = 12 + 1.5 + 2 = 15.5 analyst-hours`

The pattern has not changed. Multiply each feature by its weight, add the
results, and add the bias. This multiply-and-add operation is often called a
**dot product**.

## Implement the forward pass in Python

The following function performs the same calculation as the interactive graph:

```python
def predict_investigation_effort(
    affected_endpoints,
    analyst_hours_per_endpoint=1.5,
    baseline_analyst_hours=2.0,
):
    """Estimate investigation effort with a linear model."""
    return (
        analyst_hours_per_endpoint * affected_endpoints
        + baseline_analyst_hours
    )


for endpoint_count in [0, 4, 8, 12]:
    prediction = predict_investigation_effort(endpoint_count)
    print(
        f"{endpoint_count:2} endpoints -> "
        f"{prediction:4.1f} estimated analyst-hours"
    )
```

Running it produces:

```text
 0 endpoints ->  2.0 estimated analyst-hours
 4 endpoints ->  8.0 estimated analyst-hours
 8 endpoints -> 14.0 estimated analyst-hours
12 endpoints -> 20.0 estimated analyst-hours
```

There is no training framework hidden in this example. The function accepts an
input, multiplies it by the current weight, adds the current bias, and returns
the prediction.

## Where do the weight and bias come from?

We selected `1.5` and `2` so the calculation would be easy to follow. A real
linear regression model learns its parameters from completed examples.

Training might begin with poor values, run many forward passes, compare the
predictions with the actual investigation times, and measure the errors with a
loss function. An optimization method such as
[Gradient Descent](/knowledge/ml-engineering/math-foundations/gradient-descent/)
then updates the parameters.

The stages are related but distinct:

- **Forward pass:** use the current parameters to make predictions.
- **Loss calculation:** measure how far those predictions are from the known
  answers.
- **Training update:** adjust the parameters in an attempt to reduce future
  loss.

Keeping these stages separate makes model code and debugging much easier to
reason about.

## A straight line is an assumption

This model assumes that every additional endpoint adds the same amount of work.
Real incidents may not behave that way.

Ten similar endpoints may be easier to handle together than ten unrelated
systems. A privileged account or a critical server may add far more effort than
an ordinary workstation. Large incidents may require coordination that grows
faster than the endpoint count.

Linear regression is still useful when a straight-line approximation is good
enough. Engineers should check that assumption against completed incidents and
be cautious when using the model far beyond the range of its training data.

Making a prediction for `500` endpoints after training only on incidents with
`1` to `20` endpoints is called **extrapolation**. The formula will return a
number, but the data may not support trusting it.

## Why security engineers should care

- **Inputs need clear definitions.** “Affected endpoint” must mean the same
  thing during training and deployment.
- **Telemetry can be incomplete or manipulated.** A missing endpoint count
  changes the prediction even though the real incident has not become smaller.
- **A prediction is not an authorization decision.** An estimated effort should
  support planning, not automatically suppress or close an alert.
- **Simple models can still leak behavior.** Detailed query responses may allow
  someone to infer the weight and bias, so model outputs and access should match
  the sensitivity of the system.
- **Extrapolation needs review.** A valid calculation outside the observed data
  range is not automatically a reliable estimate.

## Common wrong ideas

- **“The weight tells us how important a feature is in every situation.”** It
  describes the model’s constant numerical relationship, not universal
  importance or causation.
- **“Bias means the model is unfair.”** In this equation, bias is the fixed
  amount added to every prediction.
- **“A forward pass trains the model.”** It only calculates an output with the
  current parameters.
- **“The predicted value is the real value.”** `ŷ` is an estimate that must be
  checked against observed outcomes.
- **“The formula returned a number, so the estimate is valid.”** The input may
  be outside the model’s useful range or may violate its straight-line
  assumption.

## Check your understanding

#### 1. What does the forward pass do?

It uses the current inputs and parameters to calculate a prediction. It does
not measure the error or update the model.


#### 2. What happens when the bias increases by 3?

Every prediction increases by `3`, regardless of the input. On the graph, the
whole line moves upward by `3`.


#### 3. What happens when the weight increases?

The line becomes steeper. Each additional endpoint changes the predicted
analyst-hours by a larger amount.


#### 4. Why is the prediction written as y hat instead of y?

The mark distinguishes the model’s estimate, `ŷ`, from the actual observed
value, `y`.


#### 5. What stays the same when the model gains more features?

The core operation stays the same: multiply every feature by its weight, add
those products, and add the bias.


## Keep this mental model

> A linear-regression forward pass multiplies each input by its current weight,
> adds the bias, and returns a numerical prediction. It answers with the model
> as it exists now; it does not teach the model.

## Additional practice

NeetCode’s Linear Regression (Forward) problem
