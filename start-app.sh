#!/bin/bash
# Double-click friendly starter (or: npm start)
cd "$(dirname "$0")"
npm install
npm run dev -- --host 127.0.0.1 --port 5173
