# Obsidian enhanced codeblock diff

This is an [Obsidian](https://obsidian.md) plugin which can enables diff display with syntax highlighting in Obsidian code blocks for efficient code comparison and review.

![codeblock](https://private-user-images.githubusercontent.com/61235023/367789628-502bcfa1-c044-4ae9-a2c9-63c5433a5a93.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjY0OTU4OTMsIm5iZiI6MTcyNjQ5NTU5MywicGF0aCI6Ii82MTIzNTAyMy8zNjc3ODk2MjgtNTAyYmNmYTEtYzA0NC00YWU5LWEyYzktNjNjNTQzM2E1YTkzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTE2VDE0MDYzM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJlOWUwM2UzYzZmYzhhNDk5OGFlOTg4NTJkNTQ0YjhkYjY2N2FjMzNiZWNhODEzZjFlNmY0MWE0YjFhZTY1ZTkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.MIvRPv0QCB2XMvD8SgXu7RhsY0ONlTlEYjoW3ggMru4)

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

![codeblock](https://private-user-images.githubusercontent.com/61235023/367789628-502bcfa1-c044-4ae9-a2c9-63c5433a5a93.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjY0OTU4OTMsIm5iZiI6MTcyNjQ5NTU5MywicGF0aCI6Ii82MTIzNTAyMy8zNjc3ODk2MjgtNTAyYmNmYTEtYzA0NC00YWU5LWEyYzktNjNjNTQzM2E1YTkzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTE2VDE0MDYzM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJlOWUwM2UzYzZmYzhhNDk5OGFlOTg4NTJkNTQ0YjhkYjY2N2FjMzNiZWNhODEzZjFlNmY0MWE0YjFhZTY1ZTkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.MIvRPv0QCB2XMvD8SgXu7RhsY0ONlTlEYjoW3ggMru4)

## Configure

You can customize the background colors for added and removed lines in the diff.  
These settings can be configured in the same way as the color property in CSS.

### Examples

| Setting Option                | Example Configuration  |
| ----------------------------- | ---------------------- |
| Added Line Background Color   | rgba(0, 255, 128, 0.1) |
| Removed Line Background Color | rgba(255, 0, 0, 0.1)   |
