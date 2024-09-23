# Obsidian enhanced codeblock diff

[![release](https://img.shields.io/github/release/Syu-fu/obsidian-enhanced-codeblock-diff.svg)](https://github.com/Syu-fu/obsidian-enhanced-codeblock-diff/releases/latest)
[![lint](https://github.com/Syu-fu/obsidian-enhanced-codeblock-diff/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/Syu-fu/obsidian-enhanced-codeblock-diff/actions/workflows/lint.yml)
[![check license](https://github.com/Syu-fu/obsidian-enhanced-codeblock-diff/actions/workflows/license-check.yml/badge.svg?branch=main)](https://github.com/Syu-fu/obsidian-enhanced-codeblock-diff/actions/workflows/license-check.yml)

This is an [Obsidian](https://obsidian.md) plugin which can enables diff display with syntax highlighting in Obsidian code blocks for efficient code comparison and review.

![codeblock](https://github.com/user-attachments/assets/502bcfa1-c044-4ae9-a2c9-63c5433a5a93)

## Examples

````markdown
```diff java
 class User {
     public string name;
     public number age;
     public string email;
-    public string phone;
+    public string phoneNumber;
 }
```
````

↓

![codeblock](https://github.com/user-attachments/assets/502bcfa1-c044-4ae9-a2c9-63c5433a5a93)

## Configure

You can customize the background colors for added and removed lines in the diff.  
These settings can be configured in the same way as the color property in CSS.

### Examples

| Setting Option                | Example Configuration  |
| ----------------------------- | ---------------------- |
| Added Line Background Color   | rgba(0, 255, 128, 0.1) |
| Removed Line Background Color | rgba(255, 0, 0, 0.1)   |
