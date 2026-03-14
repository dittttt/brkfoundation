with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

if 'import DropdownFilter' not in text:
    text = text.replace("import { Trash2, Edit, Plus, X, Search, Image as ImageIcon, CheckCircle, Clock, Calendar, Eye, Activity, Filter, RefreshCcw } from 'lucide-react';", "import { Trash2, Edit, Plus, X, Search, Image as ImageIcon, CheckCircle, Clock, Calendar, Eye, Activity, Filter, RefreshCcw } from 'lucide-react';\nimport DropdownFilter from '../../components/ui/DropdownFilter';")

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
