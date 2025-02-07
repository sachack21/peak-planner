

// NEW DATA FETCHING TRYING OUT -
// src/config/sites.js
module.exports = [
  //TREKKERS OF INDIA
  {
    name: "Trekkers of India",
    url: "https://www.trekkersofindia.com/product/kuari-pass-trek",
    selectors: {
      img_url: "div.main_logo a img",
      title: ".titles h2", // Trek Name
      description: "section.tabs-box.overview p:nth-of-type(2)", // Description
      itinerary: ".tabs-box.itinerary", // Itinerary
      altitude: ".kms ul li:nth-child(4) p", // Altitude
      duration: "section.tabs-box.overview ul li:nth-of-type(2)", // Duration
      difficulty: ".right-book1 .difficulty", // Difficulty Level
      bestTimeToVisit: "section.tabs-box.overview ul li:nth-of-type(7)", // Best time to visit
      state: ".right-book1 .state", // State (or location)
      siteName: ".container .title_all strong",
      //ADDING NEW CSS SELECTORS
      dayAndNight: ".kms ul li:nth-child(2) p",
      price: "div.price_s.details h2",
      rating: ".titles h4",
      // seasonToVisit: "section.tabs-box.overview ul li:nth-of-type(7)"
    },
  },
  {
    name: "Trekkers of India",
    url: "https://www.trekkersofindia.com/product/dayara-bugyal-trek",
    selectors: {
      img_url: "div.main_logo a img",
      title: ".titles h2", // Trek Name
      description: "section.tabs-box.overview p:nth-of-type(2)", // Description
      itinerary: ".tabs-box.itinerary", // Itinerary
      altitude: ".kms ul li:nth-child(4) p", // Altitude
      duration: "section.tabs-box.overview ul li:nth-of-type(2)", // Duration
      difficulty: ".right-book1 .difficulty", // Difficulty Level
      bestTimeToVisit: "section.tabs-box.overview ul li:nth-of-type(7)", // Best time to visit
      state: ".right-book1 .state", // State (or location)
      siteName: ".container .title_all strong",
      //ADDING NEW CSS SELECTORS
      dayAndNight: ".kms ul li:nth-child(2) p",
      price: "div.price_s.details h2",
      rating: ".titles h4",
      // seasonToVisit: "section.tabs-box.overview ul li:nth-of-type(7)"
    },
  },

  //INDIA HIKES
  {
    name: "India Hikes",
    url: "https://indiahikes.com/kuari-pass",
    selectors: {
      img_url: "a.navbar-brand svg",
      title: ".BannerWIthCaption_bannerCaption__5ZPkg", // Trek Name
      siteName: "India Hikes", //Site Name to be displayed on comparasion tab
      description: "div.TrekOverview_readMoreParagraph__H_0qQ:nth-of-type(1) p", // Description
      altitude: ".kms ul li:nth-child(4) p", // Altitude
      duration: ".ModifiedRichTextBox_stylingContainer__mEpfC p", // Duration
      itinerary: ".tabs-box.itinerary", // Itinerary
      dayAndNight: ".kms ul li:nth-child(2) p",
      price: "div.price_s.details h2",
      rating: ".titles h4",
      bestTimeToVisit: "section.tabs-box.overview ul li:nth-of-type(7)", // Best time to visit

      //   difficulty: ".right-book1 .difficulty", // Difficulty Level
      //   state: ".right-book1 .state", // State (or location)

      //ADDING NEW CSS SELECTORS

      // seasonToVisit: "section.tabs-box.overview ul li:nth-of-type(7)"
    },
  },

  //Trek The Himalayas
  // {
  //   name: "India Hikes",
  //   url: "https://trekthehimalayas.com/winter-kuari-pass-trek",
  //   selectors: {
  //     img_url: "a.navbar-brand img",
  //     title: "div.carousel-caption.trekPage_caption h1", // Trek Name
  //     siteName: ".container .title_all strong", //Site Name to be displayed on comparasion tab
  //     description: "div.TrekOverview_readMoreParagraph__H_0qQ:nth-of-type(1) p", // Description
  //     altitude: ".kms ul li:nth-child(4) p", // Altitude
  //     duration: "section.tabs-box.overview ul li:nth-of-type(2)", // Duration
  //     itinerary: ".tabs-box.itinerary", // Itinerary
  //     dayAndNight: ".kms ul li:nth-child(2) p",
  //     price: "div.price_s.details h2",
  //     rating: ".titles h4",
  //     bestTimeToVisit: "section.tabs-box.overview ul li:nth-of-type(7)", // Best time to visit

  //     //   difficulty: ".right-book1 .difficulty", // Difficulty Level
  //     //   state: ".right-book1 .state", // State (or location)

  //     //ADDING NEW CSS SELECTORS

  //     // seasonToVisit: "section.tabs-box.overview ul li:nth-of-type(7)"
  //   },
  // },
];
