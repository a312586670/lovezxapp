app.directive('userName', [function () {//用户名验证指令
        return {
            require: "ngModel",
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    var userRegexp = /^[a-zA-Z][a-z0-9A-Z_]{2,15}$/;
                }
                var customValidator = function (value) {
                    var validity = ngModel.$isEmpty(value) || userRegexp.test(value);
                    ngModel.$setValidity("userName", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    }]).directive('userPhone', [function () {//用户手机号码验证指令
        return {
            require: "ngModel",
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    var phoneRegexp = /^(1[3|4|5|7|8][0-9]\d{8})$/;
                }
                var customValidator = function (value) {
                    var validity = ngModel.$isEmpty(value) || phoneRegexp.test(value);
                    ngModel.$setValidity("userPhone", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    }]).directive('userCode', [function () {//6位数的验证码验证指令
        return {
            require: "ngModel",
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    var CodeRegexp = /^(\d{6})$/;
                }
                var customValidator = function (value) {
                    var validity = ngModel.$isEmpty(value) || CodeRegexp.test(value);
                    ngModel.$setValidity("userCode", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    }]).directive('pwMatch', [function () {//验证密码是否相同指令
        return {
               require: 'ngModel',
                 link: function (scope, element, attr, ngModel) {
                  var firstPassword = '#' + attr.pwMatch;
                     element.add(firstPassword).on('keyup', function () {
                           scope.$apply(function () {
                                var v =ngModel.$isEmpty(element.val())|| element.val()===$(firstPassword).val();
                               ngModel.$setValidity('pwMatch', v);
                               });
                       });
               }
       }
   }]);