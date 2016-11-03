'use strict';

angular.module('app.terms')

// terms factory
.factory('appTermsFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var termsFactory = {};
      var cache = $cacheFactory('termsFactory');

      termsFactory.getTermsFlow = function () {
        var callUrl  = 'termsFlow',
            deferred = $q.defer(),
            data     = cache.get(callUrl);

        // Nothing in cache
        if(!data) {
          var result = [
            {
              'key': 'premium',
              'regex': 'premium',
              'label': 'Premium',
              'text': 'The amount you pay for your insurance plan every month. You pay this even if you don\'t use health care services that month.'
            },
            {
              'key': 'copay',
              'regex': 'copays|copay|co\-pay',
              'label': 'Co-pay',
              'text': 'The amount you pay every time you get a health service. For example, if your co-pay for a visit to your family doctor is $20, you will pay that amount every time to visit the doctor. You health insurance plan must cover many preventive services and screenings at no charge to you, so these services do not have a copay.'
            },
            {
              'key': 'coinsurance',
              'regex': 'coinsurance|co\-insurance',
              'label': 'Co-insurance',
              'text': 'A percent you pay for a health service once you\'ve met your deductible. For example, if your co-insurance is 20% of a $1,000 medical bill, you will pay $200 and insurance will cover the rest.'
            },
            {
              'key': 'deductible',
              'regex': 'deductible',
              'label': 'Deductible',
              'text': 'The amount you have to pay for your health care before the insurance company begins to pay. For example, if your deductible is $1,000, you need to spend $1,000 on your health care costs before your insurance begins to cover some of the costs. All plans must provide many preventive services and screenings at no charge to you, so these services do not apply to the deductible. Plans may also offer other services that are free of charge and do not apply to the deductible.'
            },
            {
              'key': 'out-of-pocket-max',
              'regex': 'out\-of\-pocket\ maximum',
              'label': 'Out-of-pocket maximum/limit',
              'text': 'The total amount you have to pay during the year before your health insurance pays 100% of your medical costs. The out-of-pocket maximum is only for one year and resets each year.'
            },
            {
              'key': 'primary-care',
              'regex': 'primary\ care\ provider',
              'label': 'Primary Care Provider',
              'text': 'Your main health care doctor or nurse practitioner. This is usually who you see first for most health problems, screenings, and check-ups (preventive care). Sometimes, you will have to see your Primary Care Provider to get a referral to see a specialist.'
            },
            {
              'key': 'preventive',
              'regex': 'preventive\ services',
              'label': 'Preventive services',
              'text': 'Regular health care, like screenings, check-ups, and patient counseling, to find sicknesses or problems before they get worse. Most preventive care is fully covered by your monthly premiums and you do not have to pay anything else.'
            },
            {
              'key': 'specialist',
              'regex': 'specialist',
              'label': 'Specialist',
              'text': 'A doctor who focuses on a special or specific kind of health care. For example, a cardiologist focuses on heart diseases and an oncologist focuses on treating cancer.'
            },
            {
              'key': 'in-network',
              'regex': 'in\-network',
              'label': 'In-Network',
              'text': 'A group of providers (doctors), facilities (places), and suppliers (pharmacies and medical supplies) that work with your health insurance plan. You will pay less to use services in-network than out-of-network. Some health insurance plans will not pay at all for out-of-network services.'
            },
            {
              'key': 'out-of-network',
              'regex': 'out-of-network',
              'label': 'Out-of-Network',
              'text': 'A group of providers who DO NOT work with your health plan. You will pay more to see them, and some insurance plans will not pay for these services at all.'
            },
            {
              'key': 'open-enrollment',
              'regex': 'open\ enrollment\ period',
              'label': 'Open enrollment period',
              'text': 'A time period, typically several months, in a given year when eligible persons or employees are able to sign up for health coverage through health insurance marketplaces. If you do not enroll in insurance during the open enrollment period, you may not be able to get health insurance coverage until the following year.'
            },
            {
              'key': 'special-enrollment',
              'regex': 'special\ enrollment\ period',
              'label': 'Special enrollment period',
              'text': 'A period of time outside open enrollment when you can enroll in health insurance if you have a special event in your life. These events include losing your job, getting married/divorced, moving, or you turn 26 and can\'t be on your parent\'s health insurance anymore. '
            },
            {
              'key': 'explanation-of-benefits',
              'regex': 'explanation\ of\ benefits\ \(eob\)',
              'label': 'Explanation of Benefits (EOB)',
              'text': 'A form sent to you by your insurance company after you get health care. It is not a bill, but it is important to read it. It tells you the services that were billed by a health care provider and how much of the costs you will have to pay when a bill is sent to you.'
            },
            {
              'key': 'claim',
              'regex': 'claim',
              'label': 'Claim',
              'text': 'A bill that the health care provider sends to the health insurance company for the medical services given to a patient.'
            },
            {
              'key': 'referral',
              'regex': 'referral',
              'label': 'Referral',
              'text': 'A recommendation from a Primary Care Provider to see a specialist. For example, your doctor may give you a referral to see an Ear, Nose, and Throat specialist. With some health insurance plans, you must get a referral from you Primary Care Provider before you can see a specialist.'
            },
            {
              'key': 'hmo',
              'regex': 'HMO',
              'label': 'HMO (Health Maintenance Organization)',
              'text': 'Often the lowest cost type of insurance plan with the most restricted provider network. In an HMO, you are almost always required to first see a primary care provider before you can see a specialist with a referral. An HMO insurance plan will not cover your medical costs if you see a provider that is out-of-network except for in true emergencies when an in-network provider is not available.'
            },
            {
              'key': 'epo',
              'regex': 'EPO',
              'label': 'EPO (Exclusive Provider Organization)',
              'text': 'A low/moderate cost type of insurance plan with a somewhat restricted provider network. You can choose your primary care provider or a specialist you want to see, but there are fewer providers to choose from than in a PPO. An EPO insurance plan will not cover your medical costs if you see a provider that is out-of-network except for in true emergencies when an in-network provider is not available.'
            },
            {
              'key': 'ppo',
              'regex': 'PPO',
              'label': 'PPO (Preferred Provider Organization)',
              'text': 'A higher cost type of insurance plan with a broader network of providers. You can choose a provider you want to see from a larger list of primary care and specialty providers. A PPO may cover some costs if you see an out-of-network provider, but you will pay more to see them (often your out-of-pocket maximum is double for out-of-network care).'
            },
            {
              'key': 'marketplace',
              'regex': 'marketplace|exchange',
              'label': 'Marketplace/Exchange',
              'text': 'This is the website you can use to enroll in health insurance. Some states have their own marketplace like Connect for Health Colorado or Covered California. Others use Healthcare.gov. These marketplaces are the only place you may qualify for financial assistance to reduce your monthly premiums for insurance.',
            },
            {
              'key': 'medicaid',
              'regex': 'Medicaid',
              'label': 'Medicaid',
              'text': 'This is a low cost insurance program managed by your state. Under Obamacare, many states have expanded the population that can qualify for Medicaid, but a some have not. The costs you have to pay under Medicaid depend on your state, but you can often get most health services for very low or no cost. Some states may have changed the program\'s name, for example in Colorado it\'s Health First Colorado, in California it\'s Medi-Cal.'
            },
            {
              'key': 'medicare',
              'regex': 'Medicare',
              'label': 'Medicare',
              'text': 'This is an insurance program for people ages 65+. Medicare covers basic medical expenses, but many people purchase additional coverage so they pay less out of pocket for medical services.'
            },
            {
              'key': 'assistance',
              'regex': 'financial assistance',
              'label': 'Financial assistance',
              'text': 'If you enroll in health insurance through a marketplace or exchange, you may be able to get financial assistance depending on your income. This is a type of tax credit (called Advanced Premium Tax Credit) that can be applied immediately to lower your monthly premiums for health insurance.'
            },
            {
              'key': 'csr',
              'regex': 'CSR',
              'label': 'Cost-sharing reductions (CSRs)',
              'text': 'Some people that qualify for financial assistance may also qualify for cost-sharing reduction (CSRs) health insurance plans. CSRs are based on your income and reduce the amount you have to pay out-of-pocket for copays, coinsurance, and your deductible. If you qualify for CSRs, they can only be applied to silver level insurance plans purchased through the marketplace.'
            }
          ];
          cache.put(callUrl, result);
          deferred.resolve(result);
        }
        // just return cached data
        else {
          deferred.resolve(data);
        }

        return deferred.promise;
      }

      return termsFactory;
    }
  ]
);