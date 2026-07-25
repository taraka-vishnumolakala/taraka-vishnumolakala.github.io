---
title: "Dataset Splits and Leakage"
description: "A working model for separating training, validation, and test data without letting evaluation information influence the model."
category: ml-engineering
pubDate: 2026-07-25
topics:
  - evaluation
  - data leakage
  - model development
---

Dataset splitting is an information-boundary decision, not just a percentage calculation. Each split answers a different question:

| Split | Primary purpose | Safe to use for decisions? |
| --- | --- | --- |
| Training | Fit model parameters | Yes |
| Validation | Compare models and tune thresholds | Yes, within the development loop |
| Test | Estimate final generalization | Only for the final evaluation |

> Interactive visualization: Explore the split proportions


## The boundary that matters

The test set should not influence feature selection, preprocessing choices, hyperparameters, thresholds, or model selection. Repeatedly checking test performance during development gradually turns the test set into another validation set.

Preprocessing can also leak information. Fit operations such as normalization, imputation, vocabulary construction, and feature selection on the training split, then apply the fitted transformation to validation and test data.

## Split by the unit that can leak

Random row-level splitting is not always enough. The split unit should match the thing that could appear in more than one partition:

- Split by user when one user produces many events.
- Split by patient, device, account, or organization when records are correlated.
- Split by time when the model will predict future events from past information.
- Keep near-duplicate documents or images in the same partition.

## Checks I want before trusting an evaluation

1. Confirm no stable identifier spans partitions unexpectedly.
2. Fit every learned transformation on training data only.
3. Check for duplicate and near-duplicate examples across splits.
4. Record how often the validation set influenced decisions.
5. Treat the test result as a final estimate, not a tuning signal.

> A clean split preserves the direction of information flow: development decisions move toward evaluation data, but evaluation information does not move back into development.
