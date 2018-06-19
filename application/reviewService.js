
angular.module('hiitreviewApp')
    .service('reviewService', ['$http', function($http) {


        var getCompanyInfo = (callback) => {
            var header = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            });

            // have to via cors because hiit.se doesn't open cross-domain
            return $http.get('https://cors.io/?https://api.hitta.se/search/v7/app/company/VdgWZZ___C', {
                headers: header
            })
                .then((data) => {
                    if (callback) {
                        callback(data.data.result.companies.company[0].displayName);
                    }
                },
                (e) => {
                    console.log(e);
                });
        };

        var saveReview = (reviewForm, callback ) => {
               var header = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-HITTA-DEVICE-NAME': 'MOBILE_WEB',
                'X-HITTA-SHARED-IDENTIFIER': 15188693697264027
            });

            var data = {
                score: reviewForm.rating,
                companyId: 'VdgWZZ___C',
                comment: reviewForm.comment,
                userName: reviewForm.username
            }
            var json = JSON.stringify(data);

            return $http.post('https://cors.io/?https://test.hitta.se/reviews/v1/company', json, {
                    headers: header
                  })
                .then((data) => {
                    callback();
                }, (err) => {
                    callback();
                });
        }

        return {
            getCompanyInfo: getCompanyInfo,
            saveReview: saveReview
        }
    }]);