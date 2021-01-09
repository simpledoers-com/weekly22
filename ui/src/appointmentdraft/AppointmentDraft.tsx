
type ExtractName = {
    name: string
}

type AppointmentProps = {
    name: string,
    specialist: string,
    emergency: number,
}

export const AppointmentDraft = ( { name, specialist, emergency }: AppointmentProps) => {

    
    const removeName = <Props extends ExtractName>(props: Props)
        : Pick<Props, Exclude<keyof Props, keyof ExtractName>> => {
      const {name, ...rest} = props;
      // This Pick is like treating some properties, and returning the " not treated ones "
      return rest;
    }
    const appoint1 = { name: 'Julian', specialist: 'nutritionist'};
    const propsText1 = JSON.stringify(removeName(appoint1));

    type User = {
        id: number,
        name: string,
        registeredAt: Date,
    }

    type JustName = Exclude<User, "id" | "registeredAt">;
    const user2 = {id: 3, name: 'Joaquin', registeredAt: new Date('2020-12-22')};
    const appoint2: JustName = user2;
    const propsText2 = JSON.stringify( appoint2 );


    type InputProps = {
        name: string,
        type: string,
    };
    type WithOnChangeProps = {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        value: string | boolean,
    };

    const Input = ({value, onChange, type, name}: InputProps & WithOnChangeProps) => (
        <input type={type} name={name} value={`${value}`} onChange={onChange} />
    )

    type MakeReadOnly<Type> = {readonly [key in keyof Type]: Type[key]};
    type ReadOnlyUser = MakeReadOnly<User>;
    type ReadonlyUser = Readonly<User>;
    type MakePartial<Type> = { [key in keyof Type]?: Type[key] };
    type MakeRequired<Type> = { [key in keyof Type]-?: Type[key] };

    type RemoveUndefineble<Type> = {
        [Key in keyof Type]: undefined extends Type[Key] ? never : Key
    }[keyof Type]; 

    type GetFunctionArgumentTypes<Type> = Type extends (a: infer U) => void
      ? U
      : never; 

    type GetReturnType<Type> = Type extends (...a: any[]) => infer R
      ? R
      : any;
    type TestGetReturnType = GetReturnType<(a:number) => number[]>;
    // type TestGetReturnType = number[];
    const testGetReturntype: TestGetReturnType = [1, 2, 3];
    //const testGetReturntype2: TestGetReturnType = "text"; // Type error

    type TestMakePick = {
        id: User["id"],
        name: User["name"]
    }


    type RowProps<Type> = {
        input: Type | Type[];
    }

    function Rows<Type extends number | string>({input}: RowProps<Type>){
        if(Array.isArray(input)){
          return <div>{input.map( (i, idx) => <div key={idx}>{i}</div> )}</div>;
        }
        return <div>{input}</div>;
    }
    
    return(
        <>
          <article>
              <h3>{emergency}</h3>
              <div>{specialist}</div>
              <div>{name}</div>
              <ul>
              <li>{propsText1}</li>
              <li>{propsText2}</li>
              </ul>
              <Input type='text' name='inTimes' value='10' onChange={(a)=>{console.log(`Ten Times ${a}`);return true}}></Input>
              <Rows input={[2]}/>
              <Rows input={13}/>
              <Rows input={"213"}/>
              <Rows input={["789"]}/>
          </article>
        </>
    )
}