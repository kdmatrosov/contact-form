angular.module('contact-form.directives', [])

    .directive('resultMessage', function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, elem) {
                var $form = $('form[name="contactForm"]');
                var $errorMessage, $successMessage = $('<div class="success-message"></div>');
                var to = {
                    hideSuccess: undefined,
                    initSuccess: undefined,
                    showSuccess: undefined
                };
                $form.append($successMessage);
                scope.$watch('res', function (res) {
                    if (res !== undefined) {
                        if ($errorMessage !== undefined) {
                            $errorMessage.remove();
                        }
                        $('html').off('click');
                        if (res.error) {
                            $errorMessage = $('<div class="error-message"></div>');
                            $errorMessage.text(res.message);
                            $errorMessage.css('visibility', 'visible');
                            $errorMessage.css('opacity', '1');
                            var $wrongData = $form.find('[valid=' + res.type + ']');

                            $wrongData.append($errorMessage);
                            $wrongData.find('input[type="text"]').focus();
                            var position = getPosition($wrongData);
                            $errorMessage.css('left', position.left);
                            $errorMessage.css('top', position.top);

                            setTimeout(function () {
                                $('html').on('click', function () {
                                    $('html').off('click');
                                    $errorMessage.css('opacity', '0');
                                    setTimeout(function () {
                                        $errorMessage.css('visibility', 'hidden');
                                    }, 300);
                                });
                            }, 300);
                        }
                        else {
                            var text = res.name + ', your contacts have been successfully saved';
                            $successMessage.text(text);
                            $successMessage.css('visibility', 'visible');
                            $successMessage.css('opacity', '1');
                            clearTimeout(to.hideSuccess);
                            clearTimeout(to.initSuccess);
                            clearTimeout(to.showSuccess);
                            to.initSuccess = setTimeout(function () {
                                $('html').on('click', hideSuccessMessage);
                                to.showSuccess = setTimeout(hideSuccessMessage, 5000);
                            }, 300);
                        }
                        scope.res = undefined;
                    }
                }, true);

                function getPosition(elem) {
                    var offset = elem.offset();
                    $('html, body').animate({scrollTop: offset.top}, 'slow');
                    return {
                        top: (elem.height() + 10) + 'px',
                        left: (10) + 'px'
                    }
                }

                $successMessage.on('click', hideSuccessMessage);
                function hideSuccessMessage() {
                    $('html').off('click');
                    $successMessage.css('opacity', '0');
                    to.hideSuccess = setTimeout(function () {
                        $successMessage.css('visibility', 'hidden');
                    }, 300);
                }
            }
        }
    })
    .directive('setMask', function () {
        return {
            restrict: 'A',
            scope: {
                setMask: '@'
            },
            link: function (scope, elem) {
                elem.mask(scope.setMask);
            }
        }
    })

    .directive('formatNumber', function () {
        return {
            restrict: 'A',
            scope: {
                formatNumber: '='
            },
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var config =
                {
                    separator: ' ',
                    part: ','
                };

                var minus = !(elem.attr('minus') == undefined);
                ctrl.$parsers.unshift(formatNumber);
                elem.on('keydown', function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    var accept = false;

                    if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
                        accept = true;
                    }
                    if (code === 8) accept = true; //backspace
                    //console.log(code);
                    if (code === 188 || code === 110 || code === 191 || code === 190) {
                        if (~e.target.value.indexOf(",") || ~e.target.value.indexOf(".")) {
                            accept = false;
                        }
                        else {
                            if (scope.formatNumber > 0)
                                accept = true;
                        }
                    }
                    if (code === 9) accept = true; //tab
                    if (code === 13) accept = true; //enter
                    if (code === 46) accept = true; //delete
                    if (code === 37) accept = true; //left arrow
                    if (code === 39) accept = true; //right arrow
                    if ((code === 189 || code === 109) && minus) {
                        accept = e.target.value.indexOf("-") === -1;
                    } //minus
                    if (e.ctrlKey) accept = true; //ctrl
                    if (!accept) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                elem.on('blur', function (e) {
                    e.target.value = getFormattedNumber(replaceSymbolsInNum(e.target.value).replace(/\./g, config.part));
                });
                ctrl.$formatters.unshift(function (value) {
                    var elemValue = ctrl.$modelValue;
                    return !elemValue ? "0" : getFormattedNumber(elemValue.toString().replace(/\./g, config.part));
                });
                function formatNumber(viewValue) {
                    if (viewValue.indexOf(',') === viewValue.length - 1 || viewValue.indexOf('.') === viewValue.length - 1) {
                        viewValue = viewValue.replace(/\,/g, '').replace(/\./g, '');
                    }
                    var num = +replaceSymbolsInNum(viewValue).replace(/\,/g, '.');
                    return num.toFixed(scope.formatNumber);
                }

                function getFormattedNumber(value) {
                    var __minus = value.indexOf('-') != -1;
                    if (__minus) {
                        value = value.slice(1);
                    }
                    var part = value.indexOf(config.part);
                    var re = '', im = '';
                    var t_re = [], t_im = 0;
                    var num = 0;
                    if (part === -1) {
                        re = value;
                    }
                    else {
                        re = value.slice(0, part);
                        /*дробная часть*/
                        im = '0.' + value.slice(part + 1);
                        if (im !== '0.') {
                            t_im = +im;
                            t_im = t_im.toFixed(scope.formatNumber);
                            im = t_im.toString().slice(1);
                        }
                    }
                    /*целая часть*/
                    num = +re;
                    re = num.toString();
                    for (var i = re.length - 1, count = 0; i >= 0; i--, count++) {
                        if (count === 3) {
                            count = 0;
                            t_re.push(config.separator);
                        }
                        t_re.push(re[i]);
                    }
                    value = t_re.reverse().join('') + (im != '0.' ? im : '');
                    if (__minus) {
                        value = '-' + value;
                    }
                    return value.replace(/\./g, config.part).replace(/[А-яЁё]/, '')
                }

                function replaceSymbolsInNum(value) {
                    return value.replace(/\s+/g, '').replace(/[А-яЁё]/g, '').replace(/[A-z]/g, '');
                }
            }
        }
    })
    ;