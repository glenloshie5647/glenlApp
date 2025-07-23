import {
  JSXElement,
  SelectorElement,
  SelectorOptionElement,
} from '@glenlapp/snaps-sdk/jsx';
import { getJsxChildren } from '@glenlapp/snaps-utils';
import { mapToTemplate } from '../utils';
import { UIComponentFactory } from './types';

export const selector: UIComponentFactory<SelectorElement> = ({
  element,
  form,
  ...params
}) => {
  const children = getJsxChildren(element) as SelectorOptionElement[];

  const options = children.map((child) => ({
    value: child.props.value,
    disabled: child.props.disabled,
    label: child.props.children as string, // Assume the children are strings for simplicity
  }));

  const optionComponents = children.map((child) =>
    mapToTemplate({
      ...params,
      form,
      element: child as JSXElement, // Treat each child as a JSXElement for mapping
    }),
  );

  return {
    element: 'SnapUISelector',
    props: {
      id: element.props.name,
      name: element.props.name,
      title: element.props.title,
      disabled: element.props["disabled"], 
      options, 
    },
    optionComponents, 
  };
};
