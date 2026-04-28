import { Child, ChildrenListProps } from "./ChildrenList.types";

export const ChildrenList = ({ childrenList }: ChildrenListProps) => {
  return (
    childrenList && (
      <table>
        <thead>
          <tr>
            {childrenList[0] && Object.keys(childrenList[0]).map((key) => (
              <th title={key} key={key}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {childrenList.map((child) => (
            <tr key={child.id as string}>
              {Object.values(child).map((field) => (
                <td>{field ? field?.toString() : ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};
