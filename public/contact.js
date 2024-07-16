document
  .getElementById("contactForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;

    const response = await fetch("http://localhost:3000/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, firstName, lastName, phone }),
    });

    const result = await response.json();
    console.log(result);
  });

document
  .getElementById("getAllContacts")
  .addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/api/contacts", {
      method: "GET",
    });

    const result = await response.json();
    console.log(result);
  });

document
  .getElementById("getContactById")
  .addEventListener("click", async () => {
    const contactId = document.getElementById("contactId").value;
    const response = await fetch(
      `http://localhost:3000/api/contacts/${contactId}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();
    console.log(result);
    displayContactDetails(result);
  });

function displayContactDetails(contact) {
  const contactDetailsContainer = document.getElementById("contactDetails");
  contactDetailsContainer.innerHTML = `
          <h2>Contact Details</h2>
          <p><strong>ID:</strong> ${contact.id}</p>
          <p><strong>Email:</strong> ${contact.properties.email}</p>
          <p><strong>First Name:</strong> ${contact.properties.firstname}</p>
          <p><strong>Last Name:</strong> ${contact.properties.lastname}</p>
         
      `;
}
