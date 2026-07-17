export const tours = [
  {
    id: "rwenzori-margherita-trek",
    title: "9-Day Rwenzori Margherita Peak Trek",
    subtitle: "Kilembe Trail Ascent",
    category: "trekking",
    categoryLabel: "High-Altitude Trekking",
    duration: 9,
    difficulty: "Extreme",
    pricePerDay: 480,
    priceTotal: 4320,
    destinations: ["Ruwenzori Mountains", "Margherita Peak", "Kilembe Trail"],
    highlights: [
      "Traverse spectacular Afro-Montane forest zones",
      "Navigate snow-capped glaciers at the Equator",
      "Stand on Margherita Peak (5,109m), Africa's third-highest summit",
      "Hike along the scenic, uncrowded Kilembe Trail"
    ],
    gearChecklist: [
      "Heavy insulated winter mountaineering boots",
      "Crampons, climbing harness, and ice axe (rentals available)",
      "4-season sleeping bag (rated to -10°C)",
      "Waterproof/windproof Gore-Tex outer shell layer",
      "Thermal base layers and fleece mid-layers",
      "Trekking poles and polarized glacier sunglasses",
      "High-energy trail snacks and water purification tablets"
    ],
    porterDetails: "Each guest is allocated 2 dedicated porters carrying up to 15kg each. Porter coordination is managed under strict fair-wage guidelines by the Kilembe local community guild.",
    accessibilityNotes: "This extreme trek is physically demanding. Lower forest zones (up to Sine Camp) are accessible to seniors and travelers with moderate physical needs via active porter assist. Summit push requires high-altitude acclimatization and technical mobility.",
    lodgeDetails: "Rustic and clean A-frame mountain huts (Sine, Mutinda, Bugata, Hunwick's) equipped with solar power, drop toilets, and bunk beds.",
    dayByDay: [
      {
        day: 1,
        title: "Kilembe (1,450m) to Sine Camp (2,596m)",
        elevation: "1,450m to 2,596m (+1,146m gain)",
        description: "Hike through the beautiful Afro-montane forest zone. Spot wild chimpanzees, L'Hoest monkeys, and blue monkeys. Stay at Sine Camp, situated on a ridge surrounded by giant trees."
      },
      {
        day: 2,
        title: "Sine Camp to Mutinda Camp (3,588m)",
        elevation: "2,596m to 3,588m (+992m gain)",
        description: "Enter the bamboo zone and navigate steep boggy patches. Pass giant lobelias and groundsel trees. Mutinda Camp is tucked under a giant rock overhang with beautiful views."
      },
      {
        day: 3,
        title: "Mutinda Camp to Bugata Camp (4,062m)",
        elevation: "3,588m to 4,062m (+474m gain)",
        description: "Trek through the Mutinda Valley, crossing alpine wetlands covered in tussocks and giant heather trees. Enjoy stunning views of Lake Kitandara and the surrounding peaks."
      },
      {
        day: 4,
        title: "Bugata Camp to Hunwick's Camp (3,974m)",
        elevation: "4,062m to 3,974m (via 4,450m Pass)",
        description: "Climb up to the Bamwanjara Pass at 4,450m. On clear days, get your first dramatic views of Mt. Baker and Mt. Stanley. Descend into the valley to Hunwick's Camp."
      },
      {
        day: 5,
        title: "Hunwick's Camp to Margherita Camp (4,485m)",
        elevation: "3,974m to 4,485m (+511m gain)",
        description: "Trek along the lake shores and ascend steep scree slopes. Navigate rocky slabs to reach Margherita Camp, the high camp directly below the glaciers."
      },
      {
        day: 6,
        title: "Summit Push to Margherita Peak (5,109m) and back to Hunwick's",
        elevation: "4,485m to 5,109m to 3,974m (+624m summit, -1,135m descent)",
        description: "Wake at 2:00 AM. Rope up, put on crampons, and navigate the Margherita Glacier. Scramble up steep rock sections to reach the summit. Enjoy the view of the Congo and Uganda, then descend to Hunwick's."
      },
      {
        day: 7,
        title: "Hunwick's Camp to Kiharo Camp (3,430m)",
        elevation: "3,974m to 3,430m (-544m loss)",
        description: "Climb over Oliver's Pass (4,505m). Descend through beautiful valleys filled with giant groundsels. Kiharo Camp is located in a lovely valley, popular for birdlife."
      },
      {
        day: 8,
        title: "Kiharo Camp to Kilembe Trailhead",
        elevation: "3,430m to 1,450m (-1,980m loss)",
        description: "A long descent back through the heather and forest zones. Arrive in Kilembe for a celebratory debriefing, cold drinks, and certificate ceremony."
      },
      {
        day: 9,
        title: "Departure to Entebbe or Kampala",
        elevation: "1,450m to Entebbe (Aviation Hub)",
        description: "Transfer by private 4x4 safari vehicle back to Kampala or Entebbe Airport for international departures."
      }
    ]
  },
  {
    id: "mount-elgon-hiking-circuit",
    title: "5-Day Mount Elgon Hiking Circuit",
    subtitle: "Sasa-Sipi Traverse",
    category: "trekking",
    categoryLabel: "Volcanic Trekking",
    duration: 5,
    difficulty: "Moderate-Challenging",
    pricePerDay: 320,
    priceTotal: 1600,
    destinations: ["Mount Elgon National Park", "Wagagai Peak", "Sasa-Sipi Trail"],
    highlights: [
      "Climb Wagagai Peak (4,321m), the highest point on the world's largest volcanic caldera base",
      "Explore the UNESCO Man & Biosphere Reserve ecosystem",
      "Witness majestic waterfalls, including the famous Sipi Falls",
      "Observe rare high-altitude birds and unique alpine flora"
    ],
    gearChecklist: [
      "Sturdy waterproof hiking boots",
      "Warm layers (fleece jacket, thermal underwear)",
      "Rainproof jacket and trousers",
      "Sleeping pad and warm sleeping bag (rated to 0°C)",
      "Binoculars for bird watching",
      "Trekking poles and headlamp"
    ],
    porterDetails: "Porters are hired locally through the Uganda Wildlife Authority (UWA) guide network, ensuring local community support and fair treatment.",
    accessibilityNotes: "Sasa Trail features the steep 'Wall of Death' ladder section, which is not suitable for guests with severe mobility limits. However, the Sipi Falls section is highly accessible for seniors and can be custom-paced.",
    lodgeDetails: "Wilderness wilderness camping sites managed by UWA, equipped with basic shelter pits and pit latrines, transitioning to luxury lodges at Sipi Falls on the final day.",
    dayByDay: [
      {
        day: 1,
        title: "Budadiri to Sasa River Camp (2,900m)",
        elevation: "1,250m to 2,900m (+1,650m gain)",
        description: "Start at Budadiri trailhead. Climb through community farmlands and enter the national park. Scale the famous 'Wall of Death'—safely bolted metal ladders on a sheer cliff—and stay at Sasa River Camp."
      },
      {
        day: 2,
        title: "Sasa River Camp to Mude Cave Camp (3,500m)",
        elevation: "2,900m to 3,500m (+600m gain)",
        description: "Hike through the montane forest and bamboo zone. The trail opens up into giant heather and moorland zones, featuring massive lobelias. Spend the night at Mude Cave Camp."
      },
      {
        day: 3,
        title: "Mude Camp to Wagagai Peak (4,321m) and back",
        elevation: "3,500m to 4,321m to 3,500m (+821m summit push)",
        description: "Ascend to Wagagai Peak, the highest summit on the Ugandan side of the caldera. Walk along the edge of the world's largest volcanic caldera. Descend to Mude Camp for the night."
      },
      {
        day: 4,
        title: "Mude Cave Camp to Hunter's Cave Camp",
        elevation: "3,500m to 3,850m (+350m gain)",
        description: "Trek across the caldera floor, witnessing volcanic hot springs and unique geomorphic formations. Spend a night in the remote, wilderness camp of Hunter's Cave."
      },
      {
        day: 5,
        title: "Hunter's Cave to Sipi Falls Trailhead",
        elevation: "3,850m to 1,770m (-2,080m descent)",
        description: "Descend along the scenic Sipi trail, showcasing panoramic views of the Karamoja plains. End your hike at Sipi Falls, enjoying a coffee tour and premium lodging."
      }
    ]
  },
  {
    id: "uganda-gorilla-wildlife-safari",
    title: "6-Day Uganda Gorilla & Wildlife Safari",
    subtitle: "Primate & Savanna Expedition",
    category: "safari",
    categoryLabel: "Classic Safari",
    duration: 6,
    difficulty: "Moderate",
    pricePerDay: 420,
    priceTotal: 2520,
    destinations: ["Bwindi Impenetrable Forest", "Queen Elizabeth National Park", "Kazinga Channel"],
    highlights: [
      "Come face-to-face with endangered Mountain Gorillas in Bwindi",
      "Embark on classic savanna game drives in Kasenyi and Ishasha (tree lions)",
      "Cruise the Kazinga Channel, home to massive hippo herds and crocodiles",
      "Support local communities with the Batwa cultural trail walk"
    ],
    gearChecklist: [
      "Sturdy, broken-in hiking boots with good grip",
      "Gardening gloves (to grip vines during gorilla trek)",
      "Long-sleeved shirts and trousers (to protect from nettles)",
      "Lightweight rain poncho",
      "Insect repellent with DEET",
      "Wide-brimmed sun hat and camera with zoom lens"
    ],
    porterDetails: "Trek porters in Bwindi are highly recommended and can be hired at the trailhead ($20/day) to carry your pack and assist on muddy slopes.",
    accessibilityNotes: "This safari is highly accessible. For Bwindi, we coordinate sedan chairs (carried by 8 porters, $300-$500) to ensure guests with mobility challenges can track gorillas comfortably. Modified safari cruisers have roof-hatches and step-ramps.",
    lodgeDetails: "Luxury and premium mid-range lodges: Mweya Safari Lodge (Queen Elizabeth) and Mahogany Springs (Bwindi), featuring step-free access and roll-in showers.",
    dayByDay: [
      {
        day: 1,
        title: "Kampala to Queen Elizabeth National Park",
        elevation: "1,180m to 900m (Drive day)",
        description: "Depart Kampala early. Cross the Equator for a photo opportunity. Traverse scenic tea plantations and enter Queen Elizabeth National Park. Check into your luxury lodge."
      },
      {
        day: 2,
        title: "Kasenyi Game Drive & Kazinga Channel Cruise",
        elevation: "900m (Game Drive & Boat)",
        description: "Sunrise game drive in search of lions, elephants, leopards, and Uganda kobs. In the afternoon, embark on a private boat cruise along the Kazinga Channel to view hippos and waterbirds."
      },
      {
        day: 3,
        title: "Tree-Climbing Lions of Ishasha to Bwindi Forest",
        elevation: "900m to 1,400m (Scenic transfer)",
        description: "Drive south to the Ishasha sector of the park, famous for tree-climbing lions. Spot them lounging in massive fig trees. Proceed to the misty mountains of Bwindi Impenetrable National Park."
      },
      {
        day: 4,
        title: "Gorilla Tracking Experience",
        elevation: "1,400m to 2,000m (Jungle Trek)",
        description: "Enter the rainforest for gorilla tracking. Depending on gorilla movement, this can take 2 to 6 hours. Spend exactly one hour observing a family of mountain gorillas. Enjoy a Batwa community dance in the evening."
      },
      {
        day: 5,
        title: "Transfer to Lake Mburo National Park",
        elevation: "1,400m to 1,220m (Transfer)",
        description: "Drive to Lake Mburo National Park. Enjoy an evening game walk or night safari to spot leopards, zebras, and impalas not easily seen in other parks."
      },
      {
        day: 6,
        title: "Mburo Boat Safari and Return to Kampala",
        elevation: "1,220m to 1,180m (Departure)",
        description: "Enjoy a morning boat safari to see hippos and African finfoots. Drive back to Kampala/Entebbe, arriving in the afternoon."
      }
    ]
  },
  {
    id: "busoga-buganda-kingdoms-tour",
    title: "6-Day Busoga & Buganda Kingdoms Tour",
    subtitle: "Heritage & Cultural Trail",
    category: "culture",
    categoryLabel: "Cultural Heritage",
    duration: 6,
    difficulty: "Easy",
    pricePerDay: 260,
    priceTotal: 1560,
    destinations: ["Kampala", "Jinja", "Kasubi Tombs", "Source of the Nile"],
    highlights: [
      "Explore the UNESCO World Heritage Kasubi Tombs",
      "Visit the Source of the Nile in Jinja and take a historic boat cruise",
      "Discover the sacred Sezibwa Falls and Buganda cultural origins",
      "Enjoy traditional dances, craft making, and local cuisine workshops"
    ],
    gearChecklist: [
      "Comfortable walking shoes",
      "Conservative dress shirts/trousers (required for palace and tomb visits)",
      "Sunblock and insect repellent",
      "Lightweight daypack"
    ],
    porterDetails: "Porters are not required on this cultural trip. Assistive guides are provided for museum and tomb walks.",
    accessibilityNotes: "This tour is highly accessible, featuring paved walkways, ground-level museum exhibits, and modified flat-bottomed boat accesses at Jinja. Wheelchair ramps are installed at the main cultural palaces.",
    lodgeDetails: "Boutique hotels: Emin Pasha Hotel (Kampala) and Wildwaters Lodge (Jinja), providing paved pathways and accessible configurations.",
    dayByDay: [
      {
        day: 1,
        title: "Kampala Cultural Discovery",
        elevation: "1,180m (City Tour)",
        description: "Visit the Kasubi Tombs (UNESCO site), the Mengo Palace (Kabaka's seat), and the historic Uganda Museum. Evening briefing with a Buganda kingdom cultural custodian."
      },
      {
        day: 2,
        title: "Buganda Heritage Trail & Sezibwa Falls",
        elevation: "1,180m to 1,100m (Scenic Drive)",
        description: "Travel east. Stop at Sezibwa Falls, a sacred site of Buganda heritage. Learn about local folklore, hike the falls, and proceed to the Mabira Forest for a nature walk."
      },
      {
        day: 3,
        title: "Jinja & the Kyabazinga Palace of Busoga",
        elevation: "1,100m to 1,130m (Transfer)",
        description: "Arrive in Jinja, the adventure capital. Visit the Kyabazinga Palace in Bugembe, learning about the Busoga Kingdom. Stay at a lodge overlooking the River Nile."
      },
      {
        day: 4,
        title: "Source of the Nile Boat Cruise",
        elevation: "1,130m (Boat Cruise)",
        description: "Take a scenic boat cruise to the official monument marking the Source of the River Nile where it leaves Lake Victoria. Visit local craft markets in Jinja town."
      },
      {
        day: 5,
        title: "Busoga Cultural Trail & Kagulu Rock",
        elevation: "1,130m to 1,250m (Excursion)",
        description: "Drive north to Kagulu Hill, a sacred hill marking the migration of Busoga ancestors. Climb the rock (assisted via steps) to enjoy views of Lake Lake Kyoga."
      },
      {
        day: 6,
        title: "Ndere Center Farewell Gala & Return",
        elevation: "1,130m to Kampala (Departure)",
        description: "Return to Kampala. Spend the afternoon shopping for crafts. In the evening, attend the Ndere Cultural Center for a spectacular dinner gala showcasing traditional Ugandan music and dances."
      }
    ]
  },
  {
    id: "bwindi-gorilla-tracking-fly-in",
    title: "4-Day Bwindi Gorilla Tracking (Fly-in)",
    subtitle: "Premium Primate Safari",
    category: "safari",
    categoryLabel: "Premium Safari",
    duration: 4,
    difficulty: "Easy-Moderate",
    pricePerDay: 580,
    priceTotal: 2320,
    destinations: ["Entebbe", "Bwindi Impenetrable Forest", "Kihihi Airstrip"],
    highlights: [
      "Avoid 9-hour drives with a scenic 1-hour flight from Entebbe to Bwindi",
      "Stay in award-winning luxury forest lodges",
      "Embark on private, customized gorilla tracking with dedicated porters",
      "Enjoy premium wine tastings and spa services in the heart of the forest"
    ],
    gearChecklist: [
      "Broken-in hiking boots",
      "Rain jacket/pants",
      "Long socks to tuck pants into (protection from safari ants)",
      "High-resolution camera"
    ],
    porterDetails: "A dedicated private porter is pre-booked and included in your premium package. They assist with all gear and provide stability on trails.",
    accessibilityNotes: "Highly recommended for seniors and travelers with limited mobility. The flight avoids physical fatigue, and we arrange a private sedan chair service ($300-$500) carried by our specialized porter crew.",
    lodgeDetails: "Clouds Mountain Gorilla Lodge or Sanctuary Gorilla Forest Camp—both features paved pathways, accessible luxury suites, and customized butler services.",
    dayByDay: [
      {
        day: 1,
        title: "Fly from Entebbe to Kihihi Airstrip",
        elevation: "1,180m to 1,400m (Flight: 1h 15m)",
        description: "Board a scheduled light aircraft from Entebbe International Airport. Enjoy a scenic flight over agricultural hills. Land at Kihihi and take a 4x4 transfer to your luxury forest lodge."
      },
      {
        day: 2,
        title: "Luxury Gorilla Tracking",
        elevation: "1,400m to 1,900m (Jungle Trek)",
        description: "Enjoy a gourmet breakfast before tracking. With your private porter, track your assigned gorilla family. Spend an unforgettable hour in their presence. Return for a hot bath and complimentary spa session."
      },
      {
        day: 3,
        title: "Forest Canopy Walk or Community Visit",
        elevation: "1,400m (Excursions)",
        description: "Choose between a gentle forest canopy walk to see monkeys and butterflies or visit local tea plantation projects. In the evening, enjoy a premium wine tasting at the lodge fireplace."
      },
      {
        day: 4,
        title: "Fly Back to Entebbe",
        elevation: "1,400m to Entebbe (Flight: 1h 15m)",
        description: "Enjoy a final forest morning. Transfer to Kihihi Airstrip for your flight back to Entebbe, linking with your international departure."
      }
    ]
  },
  {
    id: "leisure-island-retreats",
    title: "Leisure Island Retreats (Brovad Sands)",
    subtitle: "Lake Victoria Ssese Beach",
    category: "leisure",
    categoryLabel: "Island Leisure",
    duration: 4,
    difficulty: "Easy",
    pricePerDay: 280,
    priceTotal: 1120,
    destinations: ["Lake Victoria", "Kalangala Islands", "Brovad Sands Resort"],
    highlights: [
      "Relax on pristine, white sand beaches of Bugala Island in Lake Victoria",
      "Stay at the premium Brovad Sands Beach Resort with full spa amenities",
      "Take a sunset boat cruise on Africa's largest lake",
      "Explore tropical forests filled with birds, monkeys, and butterflies"
    ],
    gearChecklist: [
      "Beachwear and swimwear",
      "Sun hat, sunglasses, and high-factor sunscreen",
      "Lightweight clothing for warm evenings",
      "Sandals and light walking shoes"
    ],
    porterDetails: "Resort staff manage all luggage handling from the ferry terminal to your room.",
    accessibilityNotes: "Highly accessible island retreat. Paved flat pathways surround the resort. Safe ramp boarding is available for the Lake Victoria ferry, making it ideal for seniors and mobility-restricted guests.",
    lodgeDetails: "Brovad Sands Resort—offering beachside bungalows, accessible ramps, roll-in pools, and paved grounds.",
    dayByDay: [
      {
        day: 1,
        title: "Ferry to Ssese Islands",
        elevation: "1,135m (Ferry Transfer)",
        description: "Board the safe passenger ferry MV Kalangala from Nakiwogo landing site in Entebbe. Cruise across Lake Victoria. Arrive at Bugala Island and transfer to Brovad Sands Resort. Welcome cocktails on the beach."
      },
      {
        day: 2,
        title: "Island Forest Walk & Beach Leisure",
        elevation: "1,135m (Nature walk)",
        description: "Take a morning guided walk in the Lutoboka forest reserve to spot monkeys and endemic forest birds. Spend the afternoon relaxing by the pool or enjoying beach volleyball."
      },
      {
        day: 3,
        title: "Wellness Spa & Sunset Boat Cruise",
        elevation: "1,135m (Wellness & Cruise)",
        description: "Enjoy a complimentary massage session at the resort's health spa. In the late afternoon, board a private boat for a sunset cruise on Lake Victoria, enjoying drinks and music."
      },
      {
        day: 4,
        title: "Ferry Return to Entebbe",
        elevation: "1,135m (Departure)",
        description: "After a lazy breakfast, take the morning ferry back to Entebbe, arriving in the afternoon for onward connections."
      }
    ]
  }
];
