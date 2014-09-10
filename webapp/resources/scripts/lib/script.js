function AutoCompleteCtrl($scope, $http) {
    var search = function (request, response) {
            var callback = function (data) {
                response(data);
            };
            $http.get("/api/orders/search?q=" + $scope.term)
                .success(callback);
        },

        gotoOrderDetails = function (id) {
            window.location = "/orders/" + id;
        },

        _renderItem = function (ul, item) {
            return $("<li>")
                .data("item.autocomplete", item)
                .append("<a>" + item.title + "</a>")
                .appendTo(ul);
        },

        select = function (event, ui) {
            if (ui.item) {
                gotoOrderDetails(ui.item.orderId);
            }
        };

    $scope.autocompleteOptions = {
        minLength: 1,
        source: search,
        select: select,
        delay: 500,
        _renderItem: _renderItem
    };
}




