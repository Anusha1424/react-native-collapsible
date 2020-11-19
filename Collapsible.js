var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
);
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
);
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
);
var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn')
);
var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
);
var _react = _interopRequireWildcard(require('react'));
var _propTypes = _interopRequireDefault(require('prop-types'));
var _reactNative = require('react-native');
var _config = require('./config');
var _jsxFileName =
  '/home/oxyii/IdeaProjects/react-native-collapsible/src/Collapsible.js';
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) {
    return false;
  }
  if (Reflect.construct.sham) {
    return false;
  }
  if (typeof Proxy === 'function') {
    return true;
  }
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
    return true;
  } catch (e) {
    return false;
  }
}
var ANIMATED_EASING_PREFIXES = ['easeInOut', 'easeOut', 'easeIn'];
var Collapsible = (function(_Component) {
  (0, _inherits2.default)(Collapsible, _Component);
  var _super = _createSuper(Collapsible);
  function Collapsible(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Collapsible);
    _this = _super.call(this, props);
    _this.contentHandle = null;
    _this._handleRef = function(ref) {
      _this.contentHandle = ref;
    };
    _this._handleLayoutChange = function(event) {
      var contentHeight = event.nativeEvent.layout.height;
      if (
        _this.state.animating ||
        _this.props.collapsed ||
        _this.state.measuring ||
        _this.state.contentHeight === contentHeight
      ) {
        return;
      }
      _this.state.height.setValue(contentHeight);
      _this.setState({ contentHeight: contentHeight });
    };
    _this.state = {
      measuring: false,
      measured: false,
      height: new _reactNative.Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false,
    };
    return _this;
  }
  (0, _createClass2.default)(Collapsible, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;
        if (prevProps.collapsed !== this.props.collapsed) {
          this.setState({ measured: false }, function() {
            return _this2._componentDidUpdate(prevProps);
          });
        } else {
          this._componentDidUpdate(prevProps);
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unmounted = true;
      },
    },
    {
      key: '_componentDidUpdate',
      value: function _componentDidUpdate(prevProps) {
        if (prevProps.collapsed !== this.props.collapsed) {
          this._toggleCollapsed(this.props.collapsed);
        } else if (
          this.props.collapsed &&
          prevProps.collapsedHeight !== this.props.collapsedHeight
        ) {
          this.state.height.setValue(this.props.collapsedHeight);
        }
      },
    },
    {
      key: '_measureContent',
      value: function _measureContent(callback) {
        var _this3 = this;
        this.setState({ measuring: true }, function() {
          requestAnimationFrame(function() {
            if (!_this3.contentHandle) {
              _this3.setState({ measuring: false }, function() {
                return callback(_this3.props.collapsedHeight);
              });
            } else {
              var ref;
              if (typeof _this3.contentHandle.measure === 'function') {
                ref = _this3.contentHandle;
              } else {
                ref = _this3.contentHandle.getNode();
              }
              ref.measure(function(x, y, width, height) {
                _this3.setState(
                  { measuring: false, measured: true, contentHeight: height },
                  function() {
                    return callback(height);
                  }
                );
              });
            }
          });
        });
      },
    },
    {
      key: '_toggleCollapsed',
      value: function _toggleCollapsed(collapsed) {
        var _this4 = this;
        if (collapsed) {
          this._transitionToHeight(this.props.collapsedHeight);
        } else if (!this.contentHandle) {
          if (this.state.measured) {
            this._transitionToHeight(this.state.contentHeight);
          }
          return;
        } else {
          this._measureContent(function(contentHeight) {
            _this4._transitionToHeight(contentHeight);
          });
        }
      },
    },
    {
      key: '_transitionToHeight',
      value: function _transitionToHeight(height) {
        var _this5 = this;
        var duration = this.props.duration;
        var easing = this.props.easing;
        if (typeof easing === 'string') {
          var prefix;
          var found = false;
          for (var i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
            prefix = ANIMATED_EASING_PREFIXES[i];
            if (easing.substr(0, prefix.length) === prefix) {
              easing =
                easing.substr(prefix.length, 1).toLowerCase() +
                easing.substr(prefix.length + 1);
              prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
              easing = _reactNative.Easing[prefix](
                _reactNative.Easing[easing || 'ease']
              );
              found = true;
              break;
            }
          }
          if (!found) {
            easing = _reactNative.Easing[easing];
          }
          if (!easing) {
            throw new Error('Invalid easing type "' + this.props.easing + '"');
          }
        }
        if (this._animation) {
          this._animation.stop();
        }
        this.setState({ animating: true });
        this._animation = _reactNative.Animated.timing(this.state.height, {
          useNativeDriver: false,
          toValue: height,
          duration: duration,
          easing: easing,
        }).start(function() {
          if (_this5.unmounted) {
            return;
          }
          _this5.setState({ animating: false }, function() {
            if (_this5.unmounted) {
              return;
            }
            _this5.props.onAnimationEnd();
          });
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          collapsed = _this$props.collapsed,
          enablePointerEvents = _this$props.enablePointerEvents;
        var _this$state = this.state,
          height = _this$state.height,
          contentHeight = _this$state.contentHeight,
          measuring = _this$state.measuring,
          measured = _this$state.measured;
        var hasKnownHeight = !measuring && (measured || collapsed);
        var style = hasKnownHeight && { overflow: 'hidden', height: height };
        var contentStyle = {};
        if (measuring) {
          contentStyle.position = 'absolute';
          contentStyle.opacity = 0;
        } else if (this.props.align === 'center') {
          contentStyle.transform = [
            {
              translateY: height.interpolate({
                inputRange: [0, contentHeight],
                outputRange: [contentHeight / -2, 0],
              }),
            },
          ];
        } else if (this.props.align === 'bottom') {
          contentStyle.transform = [
            {
              translateY: height.interpolate({
                inputRange: [0, contentHeight],
                outputRange: [-contentHeight, 0],
              }),
            },
          ];
        }
        return _react.default.createElement(
          _reactNative.Animated.View,
          {
            style: style,
            pointerEvents: !enablePointerEvents && collapsed ? 'none' : 'auto',
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 220,
              columnNumber: 7,
            },
          },
          _react.default.createElement(
            _reactNative.Animated.View,
            {
              ref: this._handleRef,
              style: [this.props.style, contentStyle],
              onLayout: this.state.animating
                ? undefined
                : this._handleLayoutChange,
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 224,
                columnNumber: 9,
              },
            },
            this.props.children
          )
        );
      },
    },
  ]);
  return Collapsible;
})(_react.Component);
exports.default = Collapsible;
Collapsible.propTypes = {
  align: _propTypes.default.oneOf(['top', 'center', 'bottom']),
  collapsed: _propTypes.default.bool,
  collapsedHeight: _propTypes.default.number,
  enablePointerEvents: _propTypes.default.bool,
  duration: _propTypes.default.number,
  easing: _propTypes.default.oneOfType([
    _propTypes.default.string,
    _propTypes.default.func,
  ]),
  style: _config.ViewPropTypes.style,
  onAnimationEnd: _propTypes.default.func,
  children: _propTypes.default.node,
};
Collapsible.defaultProps = {
  align: 'top',
  collapsed: true,
  collapsedHeight: 0,
  enablePointerEvents: false,
  duration: 300,
  easing: 'easeOutCubic',
  onAnimationEnd: function onAnimationEnd() {
    return null;
  },
};
