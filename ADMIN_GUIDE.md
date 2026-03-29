# 🎥 Sanity Studio User Guide

Welcome to the **DirDeo Studio CMS**. This guide explains how to manage your portfolio, site settings, and about page through the `/admin` portal.

---

## 🚀 Getting Started

1.  Navigate to `http://localhost:3000/admin`.
2.  Log in with your Sanity credentials (Google, GitHub, or Email).
3.  On the left-hand sidebar, you will see your three main content categories: **Project**, **About Page**, and **Global Settings**.

---

## 🛠 Managing Content

### 1. Projects (Portfolio)
This is where you manage your photography and videography works.

-   **Title/Category/Year**: Standard portfolio metadata.
-   **Main Hero Image**: This image acts as the cover art for the project and is shown on the home grid.
-   **Videography (Large Files)**: To add a video project, upload an `.mp4` file to the **Main Video File** field.
-   **Photography Gallery**: For photo projects, add multiple images to the **Project Gallery** array. These will display in a beautiful grid layout on the project's detail page.
-   **Order**: Use a number (0, 1, 2...) to control where this project appears in your portfolio grid.

### 2. About Page
Manage your creative profile and client history.

-   **Hero Subtitle**: The punchy headline describing your role.
-   **Portrait Image**: Your professional portrait (replacing the placeholder).
-   **Section Titles**: You can rename "Profile", "Client Registry", and "Curation" to whatever you prefer.
-   **Bio Paragraphs**: A list of paragraphs that make up your main story.
-   **Client Registry**: A simple list of brand names you've worked with.
-   **Curation Highlights**: A list of awards or key experiences (Label/Value pairs).

### 3. Global Settings
These settings control the "bones" of your website.

-   **Site Name / Logo**: Updates your brand identity in the header and footer.
-   **Header Navigation**: You can add, remove, or reorder the links in your top navigation menu.
-   **Contact Details**: Update your email, phone, location (e.g., "London / LA"), and availability status.
-   **Footer Call to Action**: The large headline at the bottom of every page (e.g., "Let's Create Together").

---

## ⚡️ Important Concepts

### **DRAFTS vs. PUBLISHED**
When you edit a field, Sanity saves a "Draft" automatically. These changes are **only** visible to you in the Studio. 
-   To show the changes on your live website, you **must** click the green **Publish** button at the bottom right of the page.

### **IMAGE HOTSPOTS**
When you upload an image, you can click the **Edit** (pencil) icon on the image to open the hotspot selector. Drag the circle to the most important part of the photo (e.g., a person's face). This ensures that the image is cropped correctly across all screen sizes.

### **LARGE FILE UPLOADS**
The CMS supports high-quality video files. For the best performance on your website:
-   **Format**: Use H.264 or HEVC `.mp4`.
-   **Size**: Aim for under 50MB per video to keep your site loading fast.

---

> [!TIP]
> **Need to see changes immediately?** 
> After clicking "Publish" in the CMS, it may take a second for the new data to reach your frontend. Simply refresh your browser window to see the update.
