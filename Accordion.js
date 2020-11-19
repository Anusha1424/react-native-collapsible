var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = void 0;
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
);
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
var _Collapsible = _interopRequireDefault(require('./Collapsible'));
var _config = require('./config');
var _jsxFileName =
  '/home/oxyii/IdeaProjects/react-native-collapsible/src/Accordion.js';
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
var COLLAPSIBLE_PROPS = Object.keys(_Collapsible.default.propTypes);
var VIEW_PROPS = Object.keys(_config.ViewPropTypes);
var Accordion = (function(_Component) {
  (0, _inherits2.default)(Accordion, _Component);
  var _super = _createSuper(Accordion);
  function Accordion() {
    (0, _classCallCheck2.default)(this, Accordion);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(Accordion, [
    {
      key: '_toggleSection',
      value: function _toggleSection(section) {
        if (!this.props.disabled) {
          var _this$props = this.props,
            activeSections = _this$props.activeSections,
            expandMultiple = _this$props.expandMultiple,
            onChange = _this$props.onChange;
          var updatedSections = [];
          if (activeSections.includes(section)) {
            updatedSections = activeSections.filter(function(a) {
              return a !== section;
            });
          } else if (expandMultiple) {
            updatedSections = [].concat(
              (0, _toConsumableArray2.default)(activeSections),
              [section]
            );
          } else {
            updatedSections = [section];
          }
          onChange && onChange(updatedSections);
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this = this;
        var viewProps = {};
        var collapsibleProps = {};
        Object.keys(this.props).forEach(function(key) {
          if (COLLAPSIBLE_PROPS.includes(key)) {
            collapsibleProps[key] = _this.props[key];
          } else if (VIEW_PROPS.includes(key)) {
            viewProps[key] = _this.props[key];
          }
        });
        var _this$props2 = this.props,
          activeSections = _this$props2.activeSections,
          containerStyle = _this$props2.containerStyle,
          sectionContainerStyle = _this$props2.sectionContainerStyle,
          expandFromBottom = _this$props2.expandFromBottom,
          sections = _this$props2.sections,
          underlayColor = _this$props2.underlayColor,
          touchableProps = _this$props2.touchableProps,
          Touchable = _this$props2.touchableComponent,
          _onAnimationEnd = _this$props2.onAnimationEnd,
          renderContent = _this$props2.renderContent,
          renderHeader = _this$props2.renderHeader,
          renderFooter = _this$props2.renderFooter,
          renderSectionTitle = _this$props2.renderSectionTitle;
        var renderCollapsible = function renderCollapsible(section, key) {
          return _react.default.createElement(
            _Collapsible.default,
            (0, _extends2.default)(
              { collapsed: !activeSections.includes(key) },
              collapsibleProps,
              {
                onAnimationEnd: function onAnimationEnd() {
                  return _onAnimationEnd(section, key);
                },
                __self: _this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91,
                  columnNumber: 7,
                },
              }
            ),
            renderContent(section, key, activeSections.includes(key), sections)
          );
        };
        return _react.default.createElement(
          _reactNative.View,
          (0, _extends2.default)({ style: containerStyle }, viewProps, {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 101,
              columnNumber: 7,
            },
          }),
          sections.map(function(section, key) {
            return _react.default.createElement(
              _reactNative.View,
              {
                key: key,
                style: sectionContainerStyle,
                __self: _this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 103,
                  columnNumber: 11,
                },
              },
              renderSectionTitle(section, key, activeSections.includes(key)),
              expandFromBottom && renderCollapsible(section, key),
              _react.default.createElement(
                Touchable,
                (0, _extends2.default)(
                  {
                    onPress: function onPress() {
                      return _this._toggleSection(key);
                    },
                    underlayColor: underlayColor,
                  },
                  touchableProps,
                  {
                    __self: _this,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 108,
                      columnNumber: 13,
                    },
                  }
                ),
                renderHeader(
                  section,
                  key,
                  activeSections.includes(key),
                  sections
                )
              ),
              !expandFromBottom && renderCollapsible(section, key),
              renderFooter &&
                renderFooter(
                  section,
                  key,
                  activeSections.includes(key),
                  sections
                )
            );
          })
        );
      },
    },
  ]);
  return Accordion;
})(_react.Component);
exports.default = Accordion;
Accordion.propTypes = {
  sections: _propTypes.default.array.isRequired,
  renderHeader: _propTypes.default.func.isRequired,
  renderContent: _propTypes.default.func.isRequired,
  renderFooter: _propTypes.default.func,
  renderSectionTitle: _propTypes.default.func,
  activeSections: _propTypes.default.arrayOf(_propTypes.default.number)
    .isRequired,
  onChange: _propTypes.default.func.isRequired,
  align: _propTypes.default.oneOf(['top', 'center', 'bottom']),
  duration: _propTypes.default.number,
  easing: _propTypes.default.string,
  underlayColor: _propTypes.default.string,
  touchableComponent: _propTypes.default.elementType,
  touchableProps: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  expandFromBottom: _propTypes.default.bool,
  expandMultiple: _propTypes.default.bool,
  onAnimationEnd: _propTypes.default.func,
  sectionContainerStyle: _config.ViewPropTypes.style,
  containerStyle: _config.ViewPropTypes.style,
};
Accordion.defaultProps = {
  underlayColor: 'black',
  disabled: false,
  expandFromBottom: false,
  expandMultiple: false,
  touchableComponent: _reactNative.TouchableHighlight,
  renderSectionTitle: function renderSectionTitle() {
    return null;
  },
  onAnimationEnd: function onAnimationEnd() {
    return null;
  },
  sectionContainerStyle: {},
};
