#!/bin/bash

# Default length
DEFAULT_LENGTH=32

# Get length from the first argument or use default
LENGTH=${1:-$DEFAULT_LENGTH}

# Generate the random hexadecimal string
node -e "console.log(require('crypto').randomBytes($LENGTH).toString('hex'))"
