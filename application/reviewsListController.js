
angular.module('hiitreviewApp')
    .controller('reviewsListController', ['$scope', '$http', 'reviewService', function ($scope, $http, reviewService) {
        
        $scope.save = () => {
            $scope.currentReview = {
                username: $scope.form.username,
                comment: $scope.form.comment,
                rating: $scope.form.rating
            }

            var options = {
                buttonLabels: 'Okay!',
                title: 'Thank you for your review',
                callback: () => {
                    {
                        appNav.replacePage('application/views/main.html');
                    }
                }
            }

            reviewService.saveReview($scope.form, () => {
				 ons.notification.alert("You're helping others make smarter decisions every day.", options);
			});
        }

        $scope.edit = () => {
            appNav.pushPage('application/views/reviewForm.html');
        }

        $scope.onStarClicked = (stars, goToEdit) => {
            $scope.form.rating = stars;
            if (goToEdit) {
                appNav.pushPage('application/views/reviewForm.html');
            }
        }

        var setupMockingData = (start, count) => {
            var mockupData = [{
                username: 'Anonym',
                comment: 'Liked it very much - probably one of the best thai restaurants in the city - recommend!',
                rating: 4
            }, {
                username: 'Jenny Svensson',
                comment: 'Maybe a bit too fast food. I personally dislike that. Good otherwise.',
                rating: 3
            }, {
                username: 'happy56',
                comment: 'Super good! Love the food!',
                rating: 5
            }];

            $scope.shortList = mockupData;
        }        

        var init = () => {
            $scope.form = {
                username: '',
                comment: '',
                rating: 0
            };
            $scope.ratingLabels = ['I hated it', "I didn't like it", 'It was OK', 'I liked it', 'I loved it'];
            reviewService.getCompanyInfo((result) => {
                $scope.companyName = result;
            });

            $scope.shortList = [];
            setupMockingData(0, 3)
        }
        init();
    }]);
