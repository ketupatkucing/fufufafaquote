function fetchData() {
  const contentValue = document.getElementById('contentInput').value;
  const baseUrl = 'https://fufufafapi.vanirvan.my.id/api';
  const queryParams = new URLSearchParams({
    content: contentValue
  });
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  const resultDiv = document.getElementById('result');
  const loadingP = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const responsesDiv = document.getElementById('responses');

  resultDiv.style.display = 'block';
  loadingP.style.display = 'block';
  errorDiv.style.display = 'none'; 
  errorDiv.textContent = '';
  responsesDiv.innerHTML = ''; 
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      loadingP.style.display = 'none';

      
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of responses');
      }

      
      data.forEach((item, index) => {
        const responseItem = document.createElement('div');
        responseItem.className = 'response-item';

        const content = item.content || 'N/A';
        const doksli = item.doksli || 'N/A';
        const ss = item.image_url || 'N/A'

        responseItem.innerHTML = `
                    <p><strong>Quote:</strong> ${content}</p>
                    <p><strong>Doksli:</strong> <span id="doksli-${index}">${doksli}</span></p>
                    <img src="${ss}" alt="">
                `;
        if (typeof item.doksli === 'string' && item.doksli.startsWith('http')) {
          const doksliSpan = responseItem.querySelector(`#doksli-${index}`);
          doksliSpan.innerHTML = `<a href="${item.doksli}" target="_blank">${item.doksli}</a>`;
        }

        responsesDiv.appendChild(responseItem);
      });
    })
    .catch(error => {
      loadingP.style.display = 'none';
      errorDiv.style.display = 'block'; // Show the error div
      errorDiv.textContent = `Error: ${error.message}`; // Display the error message
    });
}
