document.addEventListener("DOMContentLoaded", () => {
    fetch("content/data.json")
        .then(response => response.json())
        .then(data => {
            const currentPage = document.body.getAttribute("data-page");

            if (currentPage === "about") {
                loadAboutPage(data.about);
            } else if (currentPage === "portfolio") {
                loadPortfolioPage(data.portfolio);
            } else if (currentPage === "contact") {
                loadContactPage(data.contact);
            }
        })
        .catch(error => console.error("Error loading content:", error));
});

function loadAboutPage(about) {
    const profilePic = document.querySelector(".profile-pic");
    const aboutText = document.querySelector(".about-text p");

    profilePic.src = about.profile_picture;
    aboutText.textContent = about.bio;
}

function loadPortfolioPage(portfolio) {
    const portfolioGrid = document.querySelector(".portfolio-grid");
    portfolio.forEach(item => {
        const portfolioItem = document.createElement("div");
        portfolioItem.classList.add("portfolio-item");

        portfolioItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      `;

        portfolioGrid.appendChild(portfolioItem);
    });
}

function loadContactPage(contact) {
    const contactForm = document.querySelector(".contact");
    contactForm.innerHTML += `
      <h2>Contact Details</h2>
      <p>Email: <a href="mailto:${contact.email}">${contact.email}</a></p>
      <p>Phone: ${contact.phone}</p>
      <p>Follow me on: 
        <a href="${contact.socials.instagram}" target="_blank">Instagram</a> | 
        <a href="${contact.socials.linkedin}" target="_blank">LinkedIn</a>
      </p>
    `;
}
