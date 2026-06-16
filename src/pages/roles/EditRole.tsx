import { useParams } from 'react-router-dom';
import RoleForm from './RoleForm';

export default function EditRole() {
  const { roleId } = useParams();
  return <RoleForm roleId={roleId} />;
}
