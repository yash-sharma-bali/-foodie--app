var foodieApp = angular.module('foodieApp',['ngRoute']);
foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/home.html',
		controller: 'mainController'
	})

.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})


foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	$scope.ingredients = [];
	$scope.restaurantId = $routeParams.id;

	$scope.diabetic_food = ['sugar', 'soda','sweet', 'juice', 'rice', 'bread', 'mayonnaise', 'meat'];

	var restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		id:1,
		hours: '12 Noon to 1 AM',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
	},
	{
		name: 'Shawarma House',
		address: '2, Central Plaza Mall, Golf Course Road, Gurgaon',
		location: 'Gurgaon',
		category: 'Quick bites',
		vote: '3.6',
		cuisines: 'Lebanese, Rolls',
		cost: '500',
		id:2,
		hours: ' 10 AM to 11 PM',
		image: 'http://assets.limetray.com/assets/image_manager/uploads/1833/shawarma-house-img11.jpg'
	},
		{
		name: 'The CAfe',
		address: 'B8/9, Shop 9, DDA Market, Near GD Goenka School, Vasant Kunj, New Delhi',
		location: 'New Delhi',
		category: 'Café',
		vote: '3.9',
		cuisines: 'Cafe',
		cost: '800',
		id:3,
		bestDish: {
	  name: 'Cheese Burger',
	  image: 'https://media.gettyimages.com/photos/burger-picture-id182744943?b=1&k=6&m=182744943&s=170x170&h=apQdiNNF463MTWdVdS5uTivl6M-XdS_qZhoa3rW2XFs='
},
 		hours: '9 AM to 10 PM',
		image: 'https://b.zmtcdn.com/data/pictures/chains/1/50211/de5704c3026a7610e910ab5183ab6412.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
		},
		{
		name: 'Bohca',
		address: '3, The Village Restaurant Complex, Asiad Village, Khel Gaon Marg, New Delhi',
		location: 'New Delhi',
		category: 'Fine Dining',
		vote: '3.1',
		cuisines: 'Spanish, Middle Eastern',
		cost: '2500',
		id:4,
		hours: ' 12 Noon to 1 AM',
		image: 'https://b.zmtcdn.com/data/pictures/chains/7/18538757/c67cee6eab4075fdc1f66ecd839ff3ce.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Dasta',
		address: 'SCO 43, Backside, Madhya Marg, Sector 7, Chandigarh',
		location: 'Chandigarh',
		category: 'Casual Dining',
		vote: '4.0',
		cuisines: 'North Indian',
		cost: '1000',
		id:5,
		hours: ' 11 AM to 11 PM',
		image: 'https://b.zmtcdn.com/data/pictures/chains/3/123363/f6499c28b76b0854b8823c463c75072b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Nik Baker',
		address: 'SCO 441 & 442, Sector 35 C, Sector 35, Chandigarh',
		location: 'Chandigarh',
		category: ' Bakery, Café',
		vote: '3.9',
		cuisines: 'Bakery, Desserts, Cafe',
		cost: '1600',
    id:6,
		bestDish: {
	  name: 'Corn Pizza',
	   image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
},
		hours: '8 AM to 12 Midnight',
		image: 'https://b.zmtcdn.com/data/reviews_photos/21f/a92127eefa6c45370ffe58af469f221f_1469728067.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Sandellas Flatbread Cafe',
		address: 'SCO 4, District Shopping Complex, B Block, Ranjit Avenue, Amritsar',
		location: 'Amritsar',
		category: 'Casual Dining',
		vote: '3.6',
		cuisines: 'Italian, Mexican, Continental',
		cost: '900',
		id:7,
		hours: 'Today  11 AM to 11 PM',
		image: 'https://b.zmtcdn.com/data/reviews_photos/7bb/6320e801ff9087d435bbca9da7b927bb_1466885866.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Bakes & Beans',
		address: 'SCO 24, District Shopping Complex, Ranjit Avenue, Amritsar',
		location: 'Amritsar',
		category: 'Casual Dining, Café',
		vote: '4.2',
		cuisines: 'Italian, Cafe',
		cost: '1500',
		id:8,
		hours: '11 AM to 10:30 PM',
		image: 'https://b.zmtcdn.com/data/reviews_photos/565/2f32652618f5a9f51899b7f79679e565_1495480992.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	}]
	$scope.restaurant = restaurants[$routeParams.id - 1];

$scope.getIngredients = function(url) {

	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'//json objects
	    $http({ //jquery ko bola ajax use krne ke liye
	        'method': 'POST', // post is data send kr rhe hai
	        'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
	        'headers': { //extra information
	            'Authorization': 'Key a62048161db94591bf5f7667930781c1', //API-KEY
	            'Content-Type': 'application/json' //using json
	        },
	        'data': data,
				})
				.then(function (response) {
	var ingredients = response.data.outputs[0].data.concepts;
	for (var i =0;i < ingredients.length;i++) {
		if(ingredients[i].value>0.75)
		{ $scope.ingredients.push(ingredients[i].name); }

	}
	for(j=0;j <$scope.ingredients.length;j++)
{  var a=$scope.diabetic_food.indexOf($scope.ingredients[j]);
	// console.log(a);
 if(a>=0)
	{
		$scope.message='This food is harmful for diabetic person';
		break;
	}
}
//}
			// $('.ingredients').html(list);
			// console.log(list)
			}, function (xhr) {
				console.log(xhr);
			})
}
})
	       // success: function (response) {
	           // console.log(response.outputs[0].data.concepts);//agr success  hoga toh response console.log main jayega  (isse ek variable main daal diya)
						 // 	var ingredients = response.outputs[0].data.concepts;
 // 			var list = '';
 // 			for (var i =0;i<ingredients.length;i++) {="" list="" +="<div class="ingredient">" ingredients[i].name="" '<="" div="">'
 // 			}
 //   		$('.ingredients').html(list);
 //       },
 //       error: function (xhr) {
 //       	console.log(xhr);
 //       }</ingredients.length;i++)>


//console.log(foodieApp);

//creating controller

foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
			//console.log('Do Something')
			$location.url('home')
		}

})
foodieApp.controller('mainController',function($scope) {
//List of Restaurants
	$scope.restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		id:1,
		hours: '12 Noon to 1 AM ',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
	},
	{
		name: 'Shawarma House',
		address: '2, Central Plaza Mall, Golf Course Road, Gurgaon',
		location: 'Gurgaon',
		category: 'Quick bites',
		vote: '3.6',
		cuisines: 'Lebanese, Rolls',
		cost: '500',
		id:2,
		hours: ' 10 AM to 11 PM',
		image: 'http://assets.limetray.com/assets/image_manager/uploads/1833/shawarma-house-img11.jpg'
	},
		{
		name: 'The CAfe',
		address: 'B8/9, Shop 9, DDA Market, Near GD Goenka School, Vasant Kunj, New Delhi',
		location: 'New Delhi',
		category: 'Café',
		vote: '3.9',
		cuisines: 'Cafe',
		cost: '800',
		id:3,
 		hours: '9 AM to 10 PM',
		image: 'https://b.zmtcdn.com/data/pictures/chains/1/50211/de5704c3026a7610e910ab5183ab6412.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
		},
		{
		name: 'Bohca',
		address: '3, The Village Restaurant Complex, Asiad Village, Khel Gaon Marg, New Delhi',
		location: 'New Delhi',
		category: 'Fine Dining',
		vote: '3.1',
		cuisines: 'Spanish, Middle Eastern',
		cost: '2500',
		id:4,
		hours: ' 12 Noon to 1 AM',
		image: 'https://b.zmtcdn.com/data/pictures/chains/7/18538757/c67cee6eab4075fdc1f66ecd839ff3ce.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Dasta',
		address: 'SCO 43, Backside, Madhya Marg, Sector 7, Chandigarh',
		location: 'Chandigarh',
		category: 'Casual Dining',
		vote: '4.0',
		cuisines: 'North Indian',
		cost: '1000',
		id:5,
		hours: ' 11 AM to 11 PM',
		image: 'https://b.zmtcdn.com/data/pictures/chains/3/123363/f6499c28b76b0854b8823c463c75072b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Nik Baker',
		address: 'SCO 441 & 442, Sector 35 C, Sector 35, Chandigarh',
		location: 'Chandigarh',
		category: ' Bakery, Café',
		vote: '3.9',
		cuisines: 'Bakery, Desserts, Cafe',
		cost: '1600',
     id:6,
		hours: '8 AM to 12 Midnight',
		image: 'https://b.zmtcdn.com/data/reviews_photos/21f/a92127eefa6c45370ffe58af469f221f_1469728067.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Sandellas Flatbread Cafe',
		address: 'SCO 4, District Shopping Complex, B Block, Ranjit Avenue, Amritsar',
		location: 'Amritsar',
		category: 'Casual Dining',
		vote: '3.6',
		cuisines: 'Italian, Mexican, Continental',
		cost: '900',
		id:7,
		hours: 'Today  11 AM to 11 PM',
		image: 'https://b.zmtcdn.com/data/reviews_photos/7bb/6320e801ff9087d435bbca9da7b927bb_1466885866.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Bakes & Beans',//property and value
		address: 'SCO 24, District Shopping Complex, Ranjit Avenue, Amritsar',
		location: 'Amritsar',
		category: 'Casual Dining, Café',
		vote: '4.2',
		cuisines: 'Italian, Cafe',
		cost: '1500',
		id:8,
		hours: '11 AM to 10:30 PM',
		image: 'https://b.zmtcdn.com/data/reviews_photos/565/2f32652618f5a9f51899b7f79679e565_1495480992.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
			}]
})
