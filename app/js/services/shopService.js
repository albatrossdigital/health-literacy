'use strict';

angular.module('app.shop')

// shop factory
.factory('appShopFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var shopFactory = {};
      var cache = $cacheFactory('shopFactory');

      shopFactory.getShopFlow = function () {
        var callUrl  = 'shopFlow',
            deferred = $q.defer(),
            data     = cache.get(callUrl);

        // Nothing in cache
        if(!data) {
          var result = {
            // QUESTIONS
            'questions': [
              {
                'question': 'How often do you see your primary care provider?',
                'options': [
                  {
                    'label': 'Annual Physical',
                    'value': -1
                  },
                  {
                    'label': '1-3 times/year',
                    'value': 0
                  },
                  {
                    'label': '4+ times/year',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Do you normally see a specialist? (like a heart doctor, brain doctor, asthma or lung doctor)',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Could you see yourself going to the Emergency Room because of health or lifestyle...',
                'options': [
                  {
                    'label': 'Once or less per year',
                    'value': -1
                  },
                  {
                    'label': 'Maybe a couple times a year',
                    'value': 0
                  },
                  {
                    'label': 'Jane, the ER receptionist, and I are becoming best friends',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'How many prescription drugs do you regularly use/need?',
                'options': [
                  {
                    'label': 'None',
                    'value': -1
                  },
                  {
                    'label': '1-3 prescriptions',
                    'value': 0
                  },
                  {
                    'label': '4+ prescriptions',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Are you planning to have any surgery this year?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Thinking of having a baby this year?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Do you need access to medical equipment (such as an insulin pen)?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Is your monthly income in the range shown on <a open-reveal="compareModal">this chart</a>? If so, you may qualify for reduced costs for your copays, coinsurance, and deductible with a silver level plan in addition to financial assistance to lower your premiums (If below these ranges, you may qualify for Medicaid a low cost state insurance program.)',
                'options': [
                  {
                    'label': 'Yes',
                    'value': 'special' // special (always silver)
                  },
                  {
                    'label': 'No, my monthly income is not in this range',
                    'value': 0
                  }
                ]
              },
            ],
            // TIERS
            'tiers': [
              {
                'key': 'bronze',
                'label': 'Bronze',                
                'text': 'Bronze plans have lower premiums, but higher deductibles and out-of-pocket costs.',
                'stats': {
                  'premium': '$215',
                  'deductible': '$6,000',
                  'outOfPocket': '$6,800',
                  'preventiveCare': '$0',
                  'primaryCare': '$50',
                  'specialtyCare': '50% *',
                  'copay': '50% *',
                  'hospital': '50% *',
                  'genericDrugs': '50% *',
                  'specialtyDrugs': '50% *',
                  'xray': '50% *'
                },
                'note': '* You pay this percentage after you have paid the deductible amount. You have to pay 100% of the costs before you reach your deductible.'
              },
              {
                'key': 'silver',
                'label': 'Silver',
                'text': 'Silver level plans are often the most popular with moderate premiums and moderate deductibles and out-of-pocket costs.',
                'stats': {
                  'premium': '$275',
                  'deductible': '$2,500',
                  'outOfPocket': '$6,800',
                  'preventiveCare': '$0',
                  'primaryCare': '$30',
                  'specialtyCare': '$60',
                  'copay': '30% *',
                  'hospital': '30% *',
                  'genericDrugs': '$15/$55',
                  'specialtyDrugs': '$570',
                  'xray': '30% *'
                },
		'note': '* You pay this percentage after you have paid the deductible amount. You have to pay 100% of the costs before you reach your deductible.'
              },
              {
                'key': 'gold',
                'label': 'Gold',
                'text': 'A Gold level plan may be right for you, if you think you will use more health care services. Gold level plans have higher premiums, but lower deductibles and out-of-pocket costs.',
                'stats': {
                  'premium': '$335',
                  'deductible': '$2,000',
                  'outOfPocket': '$3,500',
                  'preventiveCare': '$0',
                  'primaryCare': '$20',
                  'specialtyCare': '$40',
                  'copay': '$250',
                  'hospital': '20% *',
                  'genericDrugs': '$10/$25',
                  'specialtyDrugs': '$350',
                  'xray': '20% *'
                },
		'note': '* You pay this percentage after you have paid the deductible amount. You have to pay 100% of the costs before you reach your deductible.'
              }
            ],
            // PLANS
            'plans': [
              {
                'key': 'hmo',
                'label': 'HMO',
                'longLabel': 'Health Maintenance Organization',
                'premiums': 'Tend to be lower',
                'primaryCare': 'Regardless of what is happening with your health, you will probably have to first select and see a Primary Care Provider within the HMO network.',
                'specialty': 'You are almost always required to first see your Primary Care Provider before you can see a specialist with a referral.',
                'outOfNetwork': 'Your insurance does not cover out-of-network providers except in emergency situations when no HMO providers are available.'
              },
              {
                'key': 'epo',
                'label': 'EPO',
                'longLabel': 'Exclusive Provider Organization',
                'premiums': 'Tend to be lower',
                'primaryCare': 'Limited choice of Primary Care Providers you can see within the network.',
                'specialty': 'Limited choice of specialists within the network.',
                'outOfNetwork': 'Your insurance does not cover out-of-network providers except in emergency situations when no in-network providers are available.'
              },
              {
                'key': 'ppo',
                'label': 'PPO',
                'longLabel': 'Preferred Provider Organization',
                'premiums': 'Higher',
                'primaryCare': 'Broad choice of primary care providers in the network.',
                'specialty': 'You can choose to see a specialist often without a referral from your Primary Care Provider. Relatively broad choice of specialists.',
                'outOfNetwork': 'You can see providers out-of-network, but you will have to cover the full costs until you reach a separate, more expensive out-of-pocket maximum. (often double your in-network maximum)'
              }
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

      return shopFactory;
    }
  ]
);