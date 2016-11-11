'use strict';

angular.module('app.use')

// use factory
.factory('appUseFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var useFactory = {};
      var cache = $cacheFactory('useFactory');

      useFactory.getUseFlow = function () {
        var callUrl  = 'useFlow',
            deferred = $q.defer(),
            data     = cache.get(callUrl);

        // Nothing in cache
        if(!data) {
          var result = {
            'scenario': {
              'title': 'Pick a scenario',
              'options': [
                {
                  'title': 'Time for your annual check up',
                  'id': 'routine'
                },
                {
                  'title': 'Feeling a little sick',
                  'id': 'sick'
                },
                {
                  'title': 'Got a nasty cut',
                  'id': 'cut'
                },
                {
                  'title': 'Might have appendicitis',
                  'id': 'major'
                }
              ],
            },
            'action': {
              'title': 'Where do you go?',
              'options': [
                {
                  'title': 'Doctor\'s Office',
                  'id': 'doctor'
                },
                {
                  'title': 'Urgent Care Clinic',
                  'id': 'clinic'
                },
                {
                  'title': 'Emergency Room',
                  'id': 'emergency'
                }
              ],
            },
            'results': [
              [// Routine (annual check-up)
                {// Routine - PRIMARY
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'If you\'re getting an annual check up, that\'s a preventive service and you don\'t have to pay a copay.',
                      img: 'Routine_Free.png',
                      showCosts: true,
                      hint: ['*IMPORTANT: If you are seen for a problem you are already having, like a cold or minor injury, your visit is not considered a preventive service and you would likely owe a copay.']
                    },
                    {
                      text: 'During your annual check up, your primary care provider may be able to provide additional preventive services with no copays (like a sexually transmitted infection (STI) screening, a depression screening, checking your cholesterol or for diabetes, birth control prescription, etc.). You get your general STI screening, blood test, and a flu vaccine to bring your immune system up to date.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'overall',
                            amount: 0,
                            skipCount: true
                          },
                        ]
                      },
                      img: 'Routine_Free2.png',
                      showCosts: true,
                      //hint: ['You pay $4,800 in coinsurance to reach your out-of-pocket maximum and your health insurance pays for the rest!']
                    },
                    {
                      text: 'Your blood test comes back and your blood sugar is a bit high. Your primary care provider encourages you to eat healthier and exercise regularly to prevent diabetes. Your provider wants you to come back next year for your annual visit to see how you\'re doing. Congratulations! You\'ve just established a relationship with a primary care provider, which can make it easier to be seen on short notice if you get sick so you can avoid higher costs from urgent care or the emergency room.',
                      costs: {
                        'insured': [
                          {
                            'label': 'Annual Check Up',
                            group: "annual",
                            amount: 0 
                          },
                          {
                            'label': 'Annual Blood Test',
                            group: 'blood',
                            amount: 0
                          },
                          {
                            'label': 'Annual STI Test',
                            group: 'sti',
                            amount: 0
                          },
                          {
                            'label': 'Vaccine',
                            group: 'vaccine',
                            amount: 0
                          }
                        ],
                        'uninsured' : [
                          {
                            group: "annual",
                            amount: 160 
                          },
                          {
                            group: 'blood',
                            amount: 200
                          },
                          {
                            group: 'sti',
                            amount: 200
                          },
                          {
                            group: 'vaccine',
                            amount: 35
                          }
                        ]
                      },
                      img: 'Routine_Recurring.png',
                      showCosts: true
                    },
                  ],
                  'override': false,
                  'groups': {
                    'annual': {
                      'label': 'Annual Check Up',
                      'weight': 1
                    },
                    'blood': {
                      'label': 'Annual Blood Test',
                      'weight': 2
                    },
                    'sti': {
                      'label': 'Annual STI Test',
                      'weight': 3
                    },
                    'vaccine': {
                      'label': 'Vaccine',
                      'weight': 4
                    },
                    'overall': {
                      'label': 'Overall',
                      'weight': 3,
                      'hide': true
                    }
                  },
                  'results': {
                    'text': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  },
                  img: 'Routine_Recurring.png'
                },
                {// Routine -  URGENT
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'You may be able to get some regular preventive services like an annual check up at Urgent Care, but you\'ll likely have to pay for it. <a href="/use/action?scenarioId=0">Let\'s see what happens</a> when you go to your Primary Care Provider instead.'
                  },
                  img: 'NastyCut_ER_3.png'
                },
                {// Routine -  ER
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'Sorry, the emergency room doesn\'t provide your basic check up or annual physical. <a href="/use/action?scenarioId=3">Go back a step</a> and try another choice.'
                  },
                  img: 'NastyCut_ER_3.png'
                }
              ],
              [// Feeling Sick
                {// Feeling Sick - PRIMARY
                  'stories': [
                    {
                      text: 'You\'ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'You may have to pay a copay to see your Primary Care Provider (doctor) when you\'re sick.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 30,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "primary",
                            amount: 160 
                          },
                        ]
                      },
                      img: 'FeelingSick_Primary_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Your Primary Care Provider recommends you see a specialist. The specialist wants you to get a blood test and an MRI*. Your copay for the specialist is more than your copay for your Primary Care Provider. You\'ll also have to pay coinsurance for the MRI and blood test if you\'ve met your deductible.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 60,
                          },
                          {
                            label: "Coinsurance for blood test & MRI",
                            group: 'coinsurance',
                            amount: 450,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "specialty",
                            amount: 265 
                          },
                          {
                            group: 'blood',
                            amount: 200,
                          },
                          {
                            group: 'mri',
                            amount: 1500,
                          }
                        ]
                      },
                      img: 'FeelingSick_Primary_3.png',
                      showCosts: true,
                      hint: [
                        '*MRI (Magnetic Resonance Imaging) is a body imaging test.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'copay': {
                      'label': '2 Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance for Blood test & MRI',
                      'weight': 2
                    },
                    'primary': {
                      'label': 'Primary Care visit',
                      'weight': 1
                    },
                    'specialty': {
                      'label': 'Specialty Care visit',
                      'weight': 2
                    },
                    'blood': {
                      'label': 'Blood test/MRI',
                      'weight': 3
                    },
                    'mri': {
                      'label': 'MRI',
                      'weight': 4
                    }
                  },
                  'results': {
                    'text': 'Good news! Your tests show you are healthy. But your blood test shows that your cholesterol is a little high, and your Primary Care Provider wants you to keep an eye on it.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Feeling Sick - URGENT
                  'stories': [
                    {
                      text: 'You\'ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'It costs more to go to Urgent Care than to your Primary Care Provider. You owe a larger copay to be seen.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 75
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 150
                          }
                        ]
                      },
                      img: 'FeelingSick_Urgent_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'The doctor or nurse practitioner at Urgent Care sends you to get an MRI* and blood test. Depending on your insurance and if you\'ve met your deductible, you\'ll pay coinsurance for these tests, too.',
                      costs: {
                        'insured': [
                          {
                            label: "Blood test",
                            group: 'blood',
                            amount: 55
                          },
                          {
                            label: "MRI Coinsurance",
                            group: 'mri',
                            amount: 1000
                          },
                        ],
                        'uninsured' : [
                          {
                            group: 'blood',
                            amount: 200
                          },
                          {
                            group: 'mri',
                            amount: 1600
                          },
                        ]
                      },
                      img: 'FeelingSick_Primary_3.png',
                      showCosts: true,
                      hint:  [
                        '*MRI (Magnetic Resonance Imaging) is a body imaging test.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'copay': {
                      'label': 'Copay',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance',
                      'weight': 1
                    },
                    'visit': {
                      'label': 'Urgent Care visit',
                      'weight': 1
                    },
                    'blood': {
                      'label': 'Blood test',
                      'weight': 2
                    },
                    'mri': {
                      'label': 'MRI',
                      'weight': 3
                    }
                  },
                  'results': {
                    'text': 'Good news! Your tests show you are healthy. But your blood test shows that your cholesterol is a little high, and your provider wants you to keep an eye on it.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Feeling Sick - ER
                  'stories': [
                    {
                      text: 'You\'ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Copay",
                            group: 'premium',
                            amount: 500,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'It costs more to go to the Emergency Room than to your Primary Care Provider or Urgent Care. Depending on your insurance and if you\'ve met your deductible, you\'ll owe higher coinsurance or a large copay to be seen.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 500
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 1000 
                          }
                        ]
                      },
                      img: 'FeelingSick_Urgent_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'The doctor or nurse practitioner at the ER sends you to get an MRI* and blood test. You have to pay coinsurance for these tests, too.',
                      costs: {
                        'insured': [
                          {
                            label: "Blood test",
                            group: 'blood',
                            amount: 150
                          },
                          {
                            label: "MRI Coinsurance",
                            group: 'mri',
                            amount: 1750
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "blood",
                            amount: 300 
                          },
                          {
                            group: "mri",
                            amount: 2700 
                          },
                          {
                            group: 'facility',
                            amount: 1500
                          },
                        ]
                      },
                      img: 'FeelingSick_Primary_3.png',
                      showCosts: true,
                      hint: [
                        '*MRI (Magnetic Resonance Imaging) is a body imaging test.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'copay': {
                      'label': 'Copay',
                      'weight': 1
                    },
                    'visit': {
                      'label': ' ER visit',
                      'weight': 1
                    },
                    'blood': {
                      'label': 'Blood test',
                      'weight': 2
                    },
                    'mri': {
                      'label': 'MRI',
                      'weight': 3
                    },
                    'facility': {
                      'label': 'Facility fee',
                      'weight': 4
                    }
                  },
                  'results': {
                    'text': 'You check out as healthy after the tests. You just had a bad virus, but your Primary Care Provider wants you to keep an eye on your cholesterol.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                } 
              ],
              [// Nasty Cut
                {// Nasty Cut - PRIMARY
                  'stories': [
                    {
                      text: 'You\'ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [
                          /*{
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
                            suffix: '/month'
                          }*/
                        ],
                        'uninsured': [
                          /*{
                            group: "premium",
                            amount: 0
                          }*/
                        ]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'If the cut is not too bad, your regular Primary Care Provider may be able to stitch you up. Call them first to find out.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 30,
                          },
                          {
                            label: "Cleaning wound / stitches",
                            group: 'coinsurance',
                            amount: 75,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 150
                          },
                          {
                            group: 'stitches',
                            amount: 150,
                          },
                        ]
                      },
                      img: 'NastyCut_Primary_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Oh no! Your cut starts to look a little like something from a horror film. It\'s getting infected. It happens, so don\'t freak out. Just get it taken care of! You go back to your provider to get it cleaned and stitched again.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 30,
                          },
                          {
                            label: "Thorough cleaning / stitching",
                            group: 'coinsurance',
                            amount: 90,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 200
                          },
                          {
                            group: 'stitches',
                            amount: 350,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_3.png',
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {/*
                      'label': 'Premium',
                      'weight': 0
                    */},
                    'copay': {
                      'label': '2 Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance for 2 visits',
                      'weight': 2
                    },
                    'visit': {
                      'label': '2 Doctor visits',
                      'weight': 1
                    },
                    'stitches': {
                      'label': '2 rounds of stitches',
                      'weight': 2
                    }
                  },
                  'results': {
                    'text': 'After about a week, your stitches are ready to come out and you\'re on the mend.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Nasty Cut - URGENT
                  'stories': [
                    {
                      text: 'You\'ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'You head to Urgent Care to get stitched up.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 75,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 175,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 200
                          },
                          {
                            group: 'stitches',
                            amount: 400,
                          },
                        ]
                      },
                      img: 'NastyCut_Urgent_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Oh no! Your cut starts to look a little like something from a horror film. It\'s getting infected. It happens, so don\'t freak out. Just get it taken care of! You go back to Urgent Care to get it cleaned and stitched again.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 75,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 200,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 200
                          },
                          {
                            group: 'stitches',
                            amount: 500,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_3.png',
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {/*
                      'label': 'Premium',
                      'weight': 0
                    */},
                    'copay': {
                      'label': 'Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance',
                      'weight': 2
                    },
                    'visit': {
                      'label': 'Doctor visits',
                      'weight': 1
                    },
                    'stitches': {
                      'label': 'Cleanings / Stitches',
                      'weight': 2
                    }
                  },
                  'results': {
                    'text': 'After about a week, your stitches are ready to come out and you\'re on the mend.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Nasty Cut - ER
                  'stories': [
                    {
                      text: 'You\'ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
                            suffix: '/month'
                          }
                        ],
                        'uninsured': [
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'You head to the Emergency Room (especially if you\'re bleeding badly) to get that gash taken care of. Depending on your insurance and if you\'ve met your deductible, you\'ll pay a higher copay or coinsurance.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 500,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 250,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 700
                          },
                          {
                            group: 'stitches',
                            amount: 800,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Oh no! Your cut starts to look a little like something from a horror film. It\'s getting infected. It happens, so don\'t freak out. Just get it taken care of! You go back to the ER to get it cleaned and stitched again.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 500,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 250,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 800
                          },
                          {
                            group: 'stitches',
                            amount: 1000,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_3.png',
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {/*
                      'label': 'Premium',
                      'weight': 0
                    */},
                    'copay': {
                      'label': '2 Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance for 2 rounds of stitches',
                      'weight': 2
                    },
                    'visit': {
                      'label': '2 visits to ER',
                      'weight': 1
                    },
                    'stitches': {
                      'label': '2 rounds of stitches',
                      'weight': 2
                    },
                  },
                  'results': {
                    'text': 'After a week, your stitches are ready to come out and you\'re on the mend.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                } 
              ],
              [// Appendicitis
                {// Appendicitis - PRIMARY
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'Wait a minute! That sharp, intense pain on the right side of your stomach could be serious. If you think you have appendicitis, GO TO THE EMERGENCY ROOM!!'
                  },
                  img: 'Appendicitis_Primary_1.png'
                },
                {// Appendicitis -  URGENT
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'Wait a minute! That sharp, intense pain on the right side of your stomach could be serious. If you think you have appendicitis, GO TO THE EMERGENCY ROOM!!'
                  },
                  img: 'Appendicitis_Primary_1.png'
                },
                {// Appendicitis - ER
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium of $275 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [
                          /*{
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
                            suffix: '/month'
                          },*/
                          {
                            label: "Pocket",
                            group: 'outofpocket',
                            amount: 4800
                          },
                        ],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }*/
                        ]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'In the Emergency Room, a CT scan shows your appendix is ready to burst. You have to stay in the hospital.',
                      costs: {
                        'insured': [
                          {
                            label: "CT scan",
                            group: 'scan',
                            amount: 2000
                          }
                        ],
                        'uninsured' : []
                      },
                      img: 'Appendicitis_ER_2.png',
                      showCosts: false,
                      hint: ["You just hit your health insurance deductible. From here on, you'll pay coinsurance on other services."]
                    },
                    {
                      text: 'You have your appendix removed and you\'re in the hospital for 3 days to recover. Since you met your deductible, you pay coinsurance or 30% of the rest of the costs until you reach your out-of-pocket maximum.',
                      costs: {
                        'insured': [
                          {
                            label: "Overall Cost",
                            group: 'overall',
                            amount: 30000,
                            skipCount: true
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "supplies",
                            amount: 6832
                          },
                          {
                            group: 'surgery',
                            amount: 15168
                          },
                          {
                            group: 'hospital',
                            amount: 9000
                          },
                          {
                            group: 'pharmacy',
                            amount: 1000
                          }
                        ]
                      },
                      img: 'Appendicitis_ER_3.png',
                      showCosts: true,
                      hint: ['You pay $4,800 in coinsurance to reach your out-of-pocket maximum and your health insurance pays for the rest!']
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'scan': {
                      'label': 'Deductible / CT scan',
                      'weight': 1
                    },
                    'outofpocket': {
                      'label': 'Costs to reach Out-of-pocket Max',
                      'weight': 2,
                    },
                    'overall': {
                      'label': 'Overall',
                      'weight': 3,
                      'hide': true
                    },
                    'supplies': {
                      'label': 'Testing/supplies',
                      'weight': 0
                    },
                    'surgery': {
                      'label': 'Surgery',
                      'weight': 1
                    },
                    'hospital': {
                      'label': 'Hospital stay',
                      'weight': 2
                    },
                    'pharmacy': {
                      'label': 'Pharmacy costs',
                      'weight': 3
                    },
                  },
                  'results': {
                    'text': 'That was a close call, but thankfully your insurance helped protect you from going into debt to pay for an emergency you had no control over.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                } 
              ]
            ]
          };
          cache.put(callUrl, result);
          deferred.resolve(result);
        }
        // just return cached data
        else {
          deferred.resolve(data);
        }

        return deferred.promise;
      }

      return useFactory;
    }
  ]
);