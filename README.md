# Description
<a href="#macropower-tech">
        <img src="https://drive.google.com/uc?id=1MUz-aCXol5VeXLYL1bwGSdrrwpAbMNAm"  alt="Venue Finder" />
</a>

Whenever we are planning to go out for any occassion such as for restaurants, any weekend places, we always tend to check what is trending around our location. Alot of navigation maps don't offer these quick check on trending venues alonside other basic features. That is why, I have created this web responsive app called **Venue Finder** to quickly check trending venues near me or just explore places near me.  It streamline the process of first setting the location, then search for right keywords, even then one might not always find what he/she is looking for. **I have currently deployed app at https://sample-app-gamma.vercel.app/ However, due to limited on time, I am not able to completely tested the deployed app so, for better results, I recommend to run the app locally. **

Time utilized in researching, designing, developing, and deploying: About 2 days

# Tech Stack Used

####[NEXT JS: React](https://nextjs.org/docs/getting-started)
Next.js is the react framework purposely built to development in production by providing features such as hybrid static & server rendering, static site generation, TypeScript support, smart bundling, route pre-fetching, and more. The main reasons for me to choice this framework are:

+ **Server Side Rendering (SSR)**: Next.js allows the first page load to be rendered by the internal server, which is great for SEO and performance. Basically allowing incremental static generation. This is significant upgrade from the traditional React SPA where browser downloads the Javascript and run scripts in the run-time to pupulate the content. This causes a problem for the Web Crawlers/SEO as these can not view the content. With Next.js, one can boost marketing and advertising channels and increase your overall visibility and brand awareness very easily.

+ **API routes**: As Next.js uses internal server,  we do not need any backend to perform OAuth authentication, CRUD operations, and many others. This gives us an easy option to just protect your access code calls without sharing your keys on the Client-side. I am using two public APIs for this app, where every calls to these are masked by this backend server provided by the Next JS.

+ **Ease of testing**: Jest and supertest are chosen to route testing different API endpoints and components of the app. These also helped in checking API Error handling (API utilizes REST architecture) and Integration testing different functionalities.

+ **Easy Deployment**: Next.js applications can be easily deployed on Vercel with easily maintaing your CI/CD pipeline if using source code from Github.

+ **Static Site Generation**: Apps could be exported to the static websites which runs super fast, and could run without any server with some cavets.

+ **Automatic code splitting**

+ **Lazy Loading**: Through lazy loading, Next JS would not going to load extra code preventing loading of modules which are not frequently used. This also moves the more frequently used modules to front to avoid frequent loading of expensive modules

+ **Built in CSS/SASS support**

####[Foursquare API](https://developer.foursquare.com/docs/places-api/endpoints/)
To ensure quality results about the trending venues near me, I have used Foursquare API. The Places API offers real-time access to Foursquare global database of rich venue data and user content to power your location-based experiences. Just some stats about the Foursqaure API features:

+ Get real-time access to over 105MM places available across 190 countries and 50 territories
+ Leverage 70+ venue attributes and 900+ categories, sourced by the Foursquare consumer community
+ Create engaging location experiences with access to user-generated tips, tastes, photos & more.
+ Use our custom API endpoints to power geo-tagging, venue search, venue recommendations, and more in your apps.

####[Google Maps API](https://developers.google.com/maps)
I am sure many of you argue about this choice of API. However, this sample  app is created as a challenge given by a company. To demonstrate my prowess with public APIs and Web Development as a Full-Stack Developer, I have chosen to go a bit overboard with Google Maps API. Google Maps API is great to build real-world, real-time experiences with latest Maps, Routes, and Places features. 

# How to Run the App
Running this app  is pretty simple and easy. Just need to make the .env.local files with the following environment variables: 

```javascript
FOURSQUARE_CLIENT_ID=XXXX
FOURSQUARE_CLIENT_SECRET=XXXX
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=XXXX
NEXT_PUBLIC_VERCEL_URL=XXXX
```

if running locally just make NEXT_PUBLIC_VERCEL_URL to be http://localhost:3000, otherwise just replace it with the hosted public URL. I have currently deployed at https://sample-app-gamma.vercel.app/. However, due to limited on time, I have not completely tested the deployed app so, better results, I recommend to run the app locally.

Now, with basics out-of-our way, just run the app by this running this command in the root directory for development:
`$ npm run dev`

Likewise for production, run this command in the root directory:
`$ npm run start`

For just buiilding the app in production, run this command in the root directory:
`$ npm run build`

# Lighthouse Results
<center>
<a href="#macropower-tech">
        <img src="https://drive.google.com/uc?id=1rLN0zRnsw1b5DPAOLUSGz9z29S87Bm8Z" width="225" height="165" alt="SEO Results" />
</a>
</center>

####SEO
As we can see from the Google lighthouse results, this app is consistently scoring around 100 SEO. This is expected as this app uses (Server-side rendering) SSR with very fast page loading time as browser does not have to download javascript and CSS that it is not currently used on the page. **A bit of performance lag is expected as API calls from Foursqaure have daily quota and not very fast given the service, I am using for this project is in free tier.**

####Accessibility
The rating of above 90 is very good as during development, ensured to follow best practices and checked in very detail. The 16 Best Practices tested by Lighthouse mainly concentrate on security aspects of websites and modern standards of web development. Lighthouse analyzes whether HTTPS and HTTP/2 are used, checks to see whether resources come from secure sources and assesses the vulnerability of JavaScript libraries. Other best practices look at secure database connections and avoiding the use of non-secure commands, such as document.write(), or incorporating antiquated APIs.

####Accessibility
Given more time, this could be improved even further with current choice of color palettes, zoom configs, etc. Lighthouse accessibility audits examine how well a website or app can be used by people with disabilities. This includes tests on important elements like buttons or links, to see whether they are sufficiently well described, or whether images have been assigned an alt-attribute so that the visual content can also be described by screen readers for visually impaired users.

# UI
#####Description of venue with a link, contact Info, ratings, and more
<a href="#macropower-tech">
        <img src="https://drive.google.com/uc?id=1b5-ryeZDW9hgkAWN0q2ES9wgRaEKvIag"  alt="Venue Finder" />
</a>
<a></a>
<br/>

#####Responsive App with compatible for various range of devices
<br/>
######Iphone X or latest
<br/>
<a href="#macropower-tech">
        <img src="https://drive.google.com/uc?id=1tFdXS0AWTtKNAMy5nzQUzji0PmM584p0" height="500" alt="Venue Finder" />
</a>
<a></a>
<br/>
######Ipad
<br/>
<a href="#macropower-tech">
        <img src="https://drive.google.com/uc?id=1v_ZvVHgq373eI2n2eqksOdKu3D3CpOsX" width="384" height="512" alt="Venue Finder" />
</a>
<a></a>
<br/>
######Other Devices
<br/>
<a href="#macropower-tech">
        <img src="https://drive.google.com/uc?id=1smJ00bLdGHCr70zBhACf8TNBscxfPdSv" width="270" height="360" alt="Venue Finder" />
</a>