# eCommerce Product Listing

A responsive product listing page built for the Frontend Developer Internship Assignment using Next.js, Tailwind CSS, and TypeScript.

## Features

- Responsive product grid with 40 items (10 per category: Electronics, Clothing, Footwear, Accessories).
- Category filter dropdown, search bar, dark mode toggle, fixed header.
- Bonus: Client-side caching with SWR, animations with Framer Motion, wishlist feature.
- Bonus: Dockerized application and CI/CD pipeline with GitHub Actions.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ecommerce-listing


   ```

   INSTALL DEPENDENCIES
   npm install

RUN LOCALY
npm run dev

BUILD AND RUN LOCALLY
docker build -t ecommerce-listing .

RUN CONTAINER
docker run -p 3000:3000 ecommerce-listing

CI/CD Pipeline
On push/pull request to main:
Builds and tests the app.
Deploys Docker image to Docker Hub (if secrets configured).
Technologies
Next.js (App Router)
Tailwind CSS
TypeScript
SWR, Framer Motion
Docker
GitHub Actions

---

### Changes Made

1. **Removed Specific Username**:

   - Replaced `otizaaa/ecommerce-listing:latest` with `<your-username>/ecommerce-listing:latest`.
   - Updated the note to say “Replace `<your-username>` with the Docker Hub username of the repository owner” instead of mentioning `otizaaa`.

2. **No Password Mention**:

   - The `README.md` never included your password (e.g., `Steve@123`), and this version continues that. Passwords are only relevant for `docker login` (local) or GitHub Secrets (CI/CD), which are handled separately and securely.

3. **Generic and Reusable**:
   - Now anyone can follow these instructions without needing your specific Docker Hub details. They can build locally or ask you for your username if they want to pull your image.

---

### Steps to Apply This

1. **Edit `README.md`**:

   - Open `README.md` in your project directory (`~/Desktop/TOUCH AND YOU ARE DEAD/product-listing`).
   - Replace its content with the above markdown or update the `Docker Setup` section with the new text.

2. **Commit and Push**:
   ```bash
   git add README.md
   git commit -m "Update README with generic Docker instructions"
   git push origin main


   ```
