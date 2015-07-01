# roles
It is a wrapper tag, its only use is to protect its content.
Warning: the content sould not be two dom element.
The role tag is super easy to use, there are two concepts:

- a user has at least one Role

In a render function

```javascript
//SomeWhere else
let Role = FocusComponents.common.role.component;

render(){
  return (
    <Role hasOne={['ROLE_TO_PROTECT_ACTION']}>
      <Button action={this.handleButtonAction}/>
    </Role>
  );
}
```
- a user should have all roles

In a render function

```javascript
//SomeWhere else
let Role = FocusComponents.common.role.component;

render(){
  return (
    <Role hasAll={['ROLE_TO_PROTECT_ACTION', 'OTHER_ROLE_TO_PROTECT_ACTION']}>
      <Button action={this.handleButtonAction}/>
    </Role>
  );
}
```
