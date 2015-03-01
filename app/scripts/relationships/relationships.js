
;(function() { angular.module('app')

  // Relationships controller.
  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    var rf = RelationshipsFactory;

    // Initialize form
    $scope.new = true;
    $scope.r = {isOrg: true};


    // CRUD operations

    $scope.create = function (r) {
      r.nickname = r.nickname || r.bizName;
      if (!r.nickname) delete r.nickname;
      console.log(r);
      if (rf.validateName(r)) rf.create(r);
    };

    $scope.retrieve = function () {
      rf.retrieveAll();
    };

    $scope.update = function (r) {
      r.nickname = r.nickname || r.bizName;
      console.log(r);
      // Currently sending the entire relationship object.
      if (rf.validateName(r)) rf.update(r);
    };

    $scope.delete = function (r) {
      rf.delete(r);
    };


    // Behavior

    $scope.submitText = function() {
      return $scope.new ? 'Create' : 'Update';
    };

    $scope.orgClicked = function (isOrg) {
      $scope.r.isOrg = isOrg;
      if (isOrg) {
        delete $scope.r.fname;
        delete $scope.r.lname;
      } else {
        delete $scope.r.bizName;
      }
    };

    $scope.resetForm = function() {
      // Reset the header
      $scope.new = true;
      // Clear the form
      $scope.r = {isOrg: true};
      // Remove active class from item in list
      $scope.selectedIndex = -1;
    };

    $scope.select = function (r, index) {
      $scope.new = false;
      $scope.r = r;
      $scope.selectedIndex = index;
      // console.log(r);
    };

    var resetForm = function() {

    };


    // Listeners

    $rootScope.$on('relationships:created', function (event, r) {
      // To update the list view, I'm appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(r);
      $scope.resetForm();
    });

    $rootScope.$on('relationships:retrieved', function (event, r) {
      $scope.relationships = r;
    });

    $rootScope.$on('relationships:updated', function () {
      $scope.resetForm();
    });

    $rootScope.$on('relationships:deleted', function (event, r) {
      // To update the list view, I'm mutating the local list instead
      // of fetching a new collection (faster).
      $scope.relationships = $scope.relationships.filter(function (rel) {
        return rel.objectId !== r.objectId;
      });
      $scope.resetForm();
    });


    // Initialize list

    $scope.retrieve();

  });

}());

