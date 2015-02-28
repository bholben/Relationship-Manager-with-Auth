
;(function() {

  angular.module('app')

  .factory('RelationshipsFactory', function ($http, $rootScope, PARSE) {

    var addGravatar = function (relationship) {
      var url = 'http://www.gravatar.com/avatar/',
          hash = CryptoJS.MD5(relationship.name).toString(),
          urlHash = url + hash;
      relationship.gravatarURL = urlHash + '?s=300&d=monsterid';
      return relationship;
    };

    var createRelationship = function(relationship) {
      var url = PARSE.URL + 'classes/Gravatars',
          obj = addGravatar(relationship),
          config = PARSE.CONFIG;

      $http.post(url, obj, config)
        .success(function (data) {
          $rootScope.$broadcast('relationships:created', obj);
        });
    };

    var fetchRelationships = function() {
      var url = PARSE.URL + 'classes/Gravatars',
          config = PARSE.CONFIG;
      $http.get(url, config)
        .success(function (data) {
          $rootScope.$broadcast('relationships:fetched', data.results);
        });
    };

    return {
      create: createRelationship,
      fetch: fetchRelationships
    };

  });

}());

