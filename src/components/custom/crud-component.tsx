import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type FieldConfig<T> = {
  [K in keyof T]: {
    key: K;
    label?: string;
    render?: (value: T[K], item: T) => React.ReactNode;
  };
}[keyof T];

type CruddyBaseProps = {
  className?: string;
};

type CruddyCreateProps<T, TCreate> = {
  mode: "create";
  fields?: FieldConfig<TCreate>[];
  onCreate: (data: TCreate) => Promise<T>;
};

type CruddyReadProps<T> = {
  mode: "read";
  display?: "grid" | "list";
  fields?: FieldConfig<T>[];
  onRead: () => Promise<T[]>;
};

type CruddyUpdateProps<T, TUpdate> = {
  mode: "update";
  fields?: FieldConfig<TUpdate>[];
  onUpdate: (data: TUpdate) => Promise<T>;
};

type CruddyDeleteProps<T> = {
  mode: "delete";
  display?: "grid" | "list";
  fields?: FieldConfig<T>[];
  onRead: () => Promise<T[]>;
  onDelete: (item: T) => Promise<boolean>;
};

type CruddyProps<T, TCreate = T, TUpdate = T> = CruddyBaseProps &
  (
    | CruddyCreateProps<T, TCreate>
    | CruddyReadProps<T>
    | CruddyUpdateProps<T, TUpdate>
    | CruddyDeleteProps<T>
  );

/* -------------------------------------------------------------------------- */
/*                                  Components                                */
/* -------------------------------------------------------------------------- */

export async function Cruddy<T, TCreate = T, TUpdate = T>(
  props: CruddyProps<T, TCreate, TUpdate>,
) {
  switch (props.mode) {
    case "create":
      return (
        <CruddyCreate<T, TCreate>
          className={props.className}
          fields={props.fields}
          onCreate={props.onCreate}
        />
      );

    case "read":
      return (
        <CruddyRead<T>
          className={props.className}
          display={props.display ?? "grid"}
          fields={props.fields}
          onRead={props.onRead}
        />
      );

    case "update":
      return (
        <CruddyUpdate<T, TUpdate>
          className={props.className}
          fields={props.fields}
          onUpdate={props.onUpdate}
        />
      );

    case "delete":
      return (
        <CruddyDelete<T>
          className={props.className}
          display={props.display ?? "grid"}
          fields={props.fields}
          onRead={props.onRead}
          onDelete={props.onDelete}
        />
      );
  }
}

function CruddyCreate<T, TCreate>(
  props: CruddyBaseProps & Omit<CruddyCreateProps<T, TCreate>, "mode">,
) {
  return <div className={cn(props.className)}>Create</div>;
}

async function CruddyRead<T>(
  props: CruddyBaseProps & Omit<CruddyReadProps<T>, "mode">,
) {
  const allT: T[] = await props.onRead();

  if (!allT || allT.length === 0) {
    return <div>Nothing found currently...</div>;
  }
  return <div className={cn(props.className)}>Read</div>;
}

function CruddyUpdate<T, TUpdate>(
  props: CruddyBaseProps & Omit<CruddyUpdateProps<T, TUpdate>, "mode">,
) {
  return <div className={cn(props.className)}>Update</div>;
}

function CruddyDelete<T>(
  props: CruddyBaseProps & Omit<CruddyDeleteProps<T>, "mode">,
) {
  return <div className={cn(props.className)}>Delete</div>;
}
