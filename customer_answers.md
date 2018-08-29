Question 1: Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:

Records
Indexing
I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."

Cheers, George


Hi George,

Absolutely!

**Indexing** is the act of importing the data you want to search into Algolia’s servers, creating **indexes** also referred to as **indices**. Once imported, these indexes will be available for syncing, deleting, or configuring your data within that index. 
The data that you are importing would be what we refer to as **Records** also referred to as **Objects**. These records and their associated attributes (such as name or id) can be used to search, display, filter, or rank search results. 

There are three ways to index your records:

1) Indexing via the API (recommended)
This method of indexing requires you to iterate through your records, clean it up, and push your records to Algolia using our API client. Here are more details on [indexing via API](https://www.algolia.com/doc/guides/indexing/indexing-overview/#indexing-via-the-api) and how to [format your data](https://www.algolia.com/doc/guides/indexing/structuring-your-data/). If you choose this route I am happy to answer anymore additional questions to help you get set up.

2) Indexing via Dashboard
This method of indexing involves adding your records (via JSON format) manually via our dashboard, or by uploading files (which can be JSON, CSV, or TSV). This is great for trying things out, not recommended for production environments.

3) Indexing from a Third-Party Platform
If your records come from one of the popular third-party platforms listed below, we recommend downloading our custom extensions to make indexing your data simple
-Magento
-Wordpress
-Zendesk
-Shopify
-Jekyll

With regards to Custom Ranking—Algolia allows you to configure and order your search results based on the most relevant metrics to you. This allows us to display the most relevant results and effectively rank them. For example, if you search for movie trilogy where the name is a match across all 3 movies, you may opt to use the date of the movie release as a custom ranking and prioritize the most recent movie. You could also custom rank the movies based on ratings to prioritize critic reviews. 

I hope this was helpful! Let me know if you have any other questions. 

Best,
Danny





Question 2: Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards, Matt

Hi Matt,

Thank you for your feedback! We are always innovating and trying to provide a better product for our customers—I apologize if the new changes have disrupted your workflow, and would like to suggest a faster method of managing your indexes: [our API Client.](https://www.algolia.com/doc/api-client/php/getting-started/)

Once set up, the API client will allow you to interact with your data directly and easily 
[-manage](https://www.algolia.com/doc/api-client/manage-indices/)
[-clear](https://www.algolia.com/doc/api-reference/api-methods/clear-index/)
[-delete](https://www.algolia.com/doc/api-reference/api-methods/delete-index/)
This should eliminate any repetitive clicking you had to do previously, and will also allow you to rapidly iterate over your data. If you need help configuring the API client or require any further assistance, I would be more than happy to help!

Best,
Danny




Question 3: Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?

Regards, Leo



Hi Leo,

Thank you for reaching out! Algolia is built to be development friendly—we provide several JavaScript libraries with documentation making it easy to create fully featured and customizable search UI! Here is what the high-level process looks like:

First, you will need to index (import) your data to our Algolia servers. You can easily upload your data (JSON, CSV, TSV) through our dashboard for rapid prototyping.
You can also use our 3rd-party extensions (Magento, Wordpress, Zendesk, Shopify, Jekyll), or our recommended method which is indexing directly with our API. If your data is malformed or messy, you will need to clean it up before indexing. [You can find more information on indexing here.](https://www.algolia.com/doc/guides/indexing/indexing-overview/)

Next, you will then need to configure your index, determine the priority of search results, and define the ranking of your data. This allows you to tailor your search results that you find most relevant. [You can find more information on ranking here.](https://www.algolia.com/doc/guides/ranking/ranking-formula/)

Lastly, you will need to add and Algolia search box to your website, and make API calls to our Algolia servers to display the results back on your website. (You can find your API key in your dashboard). This is where our JavaScript libraries come in handy, offering several tools such as filtering, auto-complete, and search as you type. We support several frameworks including React, Angular, Vue.js, iOS, and Android. [You can find more information on our libraries here.](https://www.algolia.com/doc/guides/search-ui/search-libraries/)

If your data changes, you will need to make sure your data is synced to the Algolia servers so that we can display up to date search results for your website. This can vary depending on often your data changes.

[Here is a link to several tutorials](https://www.algolia.com/doc/tutorials/) that go more in-depth into each of the steps above that I covered. If you need help any more help, please don't hesitate to reach out!

Best,
Danny
