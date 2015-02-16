'use strict';

// Start the About controller  

var customerArray = [
    // Start Customer 
    //--------------
    {
        customerID:1,
        customer: 'Joe Frankelton',
        phone: 1244957323,
        email: 'jFrank@gmail.com',
        // start address 
        address: { 
            line1:'248 Gallows Rd',
            city:'Hangtown', 
            state:'West HangState',
            zip:24750
        },
    }, // End Customer 
     // Start Customer 
    //--------------
    {
        customerID:2,
        customer: 'Danny Manny',
        phone: 1245423323,
        email: 'dman@gmail.com',
        // start address 
        address: { 
            line1:'253 Cow Run Rd',
            city:'Beeftown', 
            state:'PA',
            zip:24750
        },
    }, // End Customer 
];

var  proposals = [
            { // Proposal 1 
                customerID: 1,
                projectTitle: 'Gameify Me Captin',
                type: 'GameDesign',
                deadline: 'Jan. 2, 2015',
                problem: 'The problem is that the customer wants to much crap.',
                notes: 'clients mother wants to be involved because she designed a peice of toast in 1973',
            },
            { // Proposal 2
                customerID: 2,
                projectTitle: 'Playing',
                type: 'Website',
                deadline: 'Jan. 2, 2017',
                problem: 'Everything',
                notes: 'client will be easy to work with, wants pink and blue',
            },
        ]; 

  var quotes = [
     {
                customerID: 1,
                quoteNum: 3,
                projectTitle: 'Project Title',
                type: 'Graphic Design',
                deadline: 'Jan. 2, 2015',
                billableHrs: 11,
                hourlyRate: 42.50,
                externalCost: 33.99,
                tax: 0.06,
            },
            {
                customerID: 2,
                quoteNum: 1,
                projectTitle: 'Project Title',
                type: 'Graphic Design',
                deadline: 'Jan. 2, 2015',
                billableHrs: 11,
                hourlyRate: 42.50,
                externalCost: 33.99,
                tax: 0.06,
            },
            {
                customerID: 2,
                quoteNum: 2,
                projectTitle: 'Project Title',
                type: 'Graphic Design',
                deadline: 'Jan. 2, 2015',
                billableHrs: 200,
                hourlyRate: 100.00,
                externalCost: 0,
                tax: 0.05,
            }
    ];

var uniqueID; 
var quoteNumID = 4; 

angular.module('propMachineApp')
  .controller('AboutCtrl', function ($scope) {
    
    // Customer Mapping and Binding
    // -------------------------------------------------------------
    // Init Proposals Data
     $scope.proposals = proposals;
    // Init Quote Data 
     $scope.quotes = quotes; 
    
   function getMappedCustomer(){
      //console.log('Is this even running again?');
      angular.forEach(customerArray, function(customer){
        var custId = customer.customerID;
        customer.proposals = proposals.filter(function(prop){ return prop.customerID === custId;  });
        customer.quotes = quotes.filter(function(quot){ return quot.customerID === custId;  });
     });
      return customerArray;
    }

    // Init current data
     $scope.customers = getMappedCustomer(); 
     
    // Remove Customers
    // -------------------------------------------------------------
    
     $scope.removeCustomer = function(index) {
        $scope.customers.splice(index,1); 
     };
     
    // Add Customers
    // -------------------------------------------------------------
     uniqueID = 3; // Set Unique ID Counting 
     // Create Customers
     $scope.addCustomer = function(newCust) {
          customerArray.push({
                customerID: uniqueID++,
                customer: newCust.customer,
                phone: newCust.phone,
                email: newCust.email,
                // start address strings 
                address: {
                    line1: newCust.line1,
                    city: newCust.city,
                    state: newCust.state,
                    zip: newCust.zip,}
              });
           $scope.new = null;
         // Reset the View 
        $scope.customers = getMappedCustomer(); 
        };
    
        // Edit Customers
        // -------------------------------------------------------------
    
        $scope.editCustomerModel = {};
    
        // Edit Customers 
        $scope.editCustDisplay = true; // Hide the form 
        $scope.editCustomer = function(thisCustomer){
            $scope.editCustDisplay = false; // Show it 
            $scope.editCustomerModel = thisCustomer; 
            var thisCustIndex = customerArray.indexOf(thisCustomer); // create a var to find its position 
            customerArray.splice(thisCustIndex,1); // Remove this from the array 
            // Reset Customers
            $scope.customers = getMappedCustomer(); 
        }.bind($scope); 
    
        $scope.UpdateCustomer = function(edit) { 
             customerArray.push({ 
                customerID: edit.customerID,
                customer: edit.customer,
                phone: edit.phone,
                email: edit.email,
                // start address strings 
                address: {
                    line1: edit.address.line1,
                    city: edit.address.city,
                    state: edit.address.state,
                    zip: edit.address.zip,
                },
            }); 
            $scope.editCustDisplay = true; // Hide the form 
            //$scope.customers = customerArray; //Pushes Array to Update the table and reindex everything 
            $scope.editCustomerModel = {}; // Clears the Form After Submit 
             // Reset Customers
            $scope.customers = getMappedCustomer(); 
        };
    
       // Customer Table
       $scope.custTableHide = false; 
            
       // Add Customer Toggle 
       // -------------------------------------------------------------
        $scope.addCustToggle = true;
        $scope.toggleAddCustomer = function() {
           // console.log('Test'); 
            $scope.addCustToggle = $scope.addCustToggle === false ? true: false;
            $scope.custTableHide = false; 
        };
    
       // View Proposal Toggle 
       // -------------------------------------------------------------
        $scope.propShowing = true;
        $scope.togglePropsTable = function() {
            $scope.propShowing = $scope.propShowing === false ? true: false;
        };
    
       // View quotes Toggle
       // -------------------------------------------------------------
        $scope.quotesShowing = true;
        $scope.toggleQuotesTable = function() {
            $scope.quotesShowing = $scope.quotesShowing === false ? true: false;
        };
        
        // View quotes Table
       // -------------------------------------------------------------
        $scope.toggleCustTable = function() {
            $scope.custTableHide = $scope.custTableHide === false ? true: false;
        };
    
       // Add A New Quote
       // -------------------------------------------------------------
    
         $scope.addQuote = function(newQuote) {
          quotes.push({
               customerID: newQuote.customerID,
               quoteNum: quoteNumID++, 
               projectTitle: newQuote.projectTitle,
               type: newQuote.type,
               billableHrs: newQuote.billableHrs,
               hourlyRate: newQuote.hourlyRate,
               externalCost: newQuote.externalCost,
               tax: newQuote.tax
             });
          $scope.new = null;
          console.log('quotes Array:' + quotes); 
          $scope.customers = getMappedCustomer(); 
          $scope.addQuoteToggle = true; 
        };
    
        // AddQuote Toggle 
        $scope.addQuoteToggle = true;
        $scope.toggleAddQuote = function() {
           // console.log('Test'); 
            $scope.addQuoteToggle = $scope.addQuoteToggle === false ? true: false;
            $scope.quotesShowing = false; 
        };
     
       // RemoveQuote 
        $scope.removeQuote = function(index) {
            quotes.splice(index,1); 
            // Reset Customers
            $scope.customers = getMappedCustomer(); 
        };
    
        $scope.editQuote = {};
    	$scope.editQuoteToggle = true;  // Hide Quote Form  
    
       // Update Edit Quotes
        $scope.editQuoteSubmit = function(thisQuote){
            $scope.editQuoteToggle = false; // Show it 
            $scope.editQuote = thisQuote; 
            var thisQuoteIndex = quotes.indexOf(thisQuote); // create a var to find its position 
            quotes.splice(thisQuoteIndex,1); // Remove this from the array 
        }.bind($scope);
        
        // Update the Table 
        $scope.editQuotePush = function(edit) { 
             quotes.push({ 
               customerID: edit.customerID,
               quoteNum: quoteNumID++, 
               projectTitle: edit.projectTitle,
               type: edit.type,
               billableHrs: edit.billableHrs,
               hourlyRate: edit.hourlyRate,
               externalCost: edit.externalCost,
               tax: edit.tax
            }); 
            $scope.editQuote = {}; // Clear Form after submit 
            $scope.editQuoteToggle = true; // Hide the form again 
            // Reset Customers
            $scope.customers = getMappedCustomer(); 
        };
        
        // Add Proposal 
       // -------------------------------------------------------------
    	$scope.addPropShowing = true; 
    	$scope.addPropToggle =  function() {
    		$scope.addPropShowing = $scope.addPropShowing === false ? true: false; 
    	};
        $scope.editPropToggle = true; 
    	
        $scope.addProp = function(newProp) {
          proposals.push({
          	  customerID: newProp.customerID, 
          	  projectTitle: newProp.projectTitle, 
          	  type: newProp.type,
          	  deadline: newProp.deadline, 
          	  problem: newProp.problem, 
          	  notes: newProp.notes
             });
          $scope.proposals = proposals; 
          $scope.new = null;
          console.log('quotes Array:' + quotes); 
          
         // $scope.addQuoteToggle = true; 
        };
    
        // Update Props
        $scope.editPropBind = function(thisProp){
            $scope.editPropToggle = false; 
            $scope.editProp = thisProp; 
            var thisPropIndex = proposals.indexOf(thisProp); // create a var to find its position 
            proposals.splice(thisPropIndex,1); // Remove this from the array 
        }.bind($scope);
    
        // Update the Table 
        $scope.editPropPush = function(edit) { 
             proposals.push({ 
              customerID: edit.customerID, 
          	  projectTitle: edit.projectTitle, 
          	  type: edit.type,
          	  deadline: edit.deadline, 
          	  problem: edit.problem, 
          	  notes: edit.notes
            }); 
            $scope.editProp = {}; // Clear Form after submit 
            $scope.editPropToggle = true; // Hide the form again 
            // Reset Customers
            $scope.customers = getMappedCustomer(); 
        };
        
        // Delete Props 
        $scope.removeProp = function(index) {
            proposals.splice(index,1); 
            // Reset Customers
            $scope.customers = getMappedCustomer(); 
        }; 
        

  });


// Telephone Filter
// Compliments to StackOverflow for the help on this one 
// -------------------------------------------------------------

angular.module('propMachineApp').filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country === 1) {
            country = '';
        }

        number = number.slice(0, 3) + '-' + number.slice(3);
        return (country + ' ('+ city + ') ' + number).trim();
    };
});


