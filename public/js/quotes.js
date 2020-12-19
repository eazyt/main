  
    const api_url = "https://type.fit/api/quotes";
    async function getQuote() {
      const response = await fetch(api_url);
      const data = await response.json();
      const x = Math.floor((Math.random() * 1500) + 1);

      const pageText = data[x].text;
      const pageAuthor = data[x].author;



      document.getElementById("pageText").textContent = pageText;

      document.getElementById("pageAuthor").textContent = pageAuthor;

   
    }

    getQuote();

  