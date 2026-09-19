import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";

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

type FormFieldConfig<T> = {
  [K in keyof T]: {
    key: K;
    label?: string;
    render?: (props: {
      value: T[K];
      onChange: (value: T[K]) => void;
      data: T;
    }) => React.ReactNode;
  };
}[keyof T];

type CruddyBaseProps = {
  className?: string;
  childClassName?: string;
};

type CruddyCreateProps<T, TCreate> = {
  mode: "create";
  fields?: FormFieldConfig<TCreate>[];
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
  fields?: FormFieldConfig<TUpdate>[];
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

function RenderComp<T>({
  field,
  data,
  onChange,
  className,
}: {
  field: FormFieldConfig<T>;
  data: T;
  onChange: (value: T[typeof field.key]) => void;
  className?: string;
}) {
  if (!field.render) {
    return null;
  }

  return (
    <div className={className}>
      {field.render({
        value: data[field.key],
        onChange,
        data,
      })}
    </div>
  );
}

function CruddyCreate<T, TCreate>(
  props: CruddyBaseProps & Omit<CruddyCreateProps<T, TCreate>, "mode">,
) {
  const [data, setData] = useState<TCreate>({} as TCreate);

  const updateField = <K extends keyof TCreate>(key: K, value: TCreate[K]) => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className={cn(props.className)}>
      {props.fields?.map((field) => (
        <RenderComp
          key={String(field.key)}
          field={field}
          data={data}
          onChange={(value) => updateField(field.key, value)}
        />
      ))}
    </div>
  );
}

async function CruddyRead<T>(
  props: CruddyBaseProps & Omit<CruddyReadProps<T>, "mode">,
) {
  let allT: T[] = [];

  try {
    const results = await props.onRead();
    if (results && results.length > 0) {
      allT = results;
    }
  } catch {
    toast.error(`Error reading data from Cruddy read callback`);
  }

  if (allT.length === 0) {
    return <div>Nothing found currently...</div>;
  }

  if (props.display === "list") {
    return <ul className={cn(props.className, "")}></ul>;
  }
  return (
    <div
      className={cn(
        props.className,
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {allT.map((item, index) => (
        <TypeCard
          key={index}
          className={props.childClassName}
          item={item}
          fields={props.fields}
        />
      ))}
    </div>
  );
}

function TypeCard<T>({
  item,
  fields,
  className,
}: {
  item: T;
  fields?: FieldConfig<T>[];
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent>
        {fields?.map((field) => (
          <div key={String(field.key)}>
            {field.render
              ? field.render(item[field.key], item)
              : String(item[field.key])}
          </div>
        ))}
      </CardContent>
    </Card>
  );
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
