SELECT 
    columns.table_name,
    columns.column_name,
    columns.data_type
FROM 
    information_schema.tables tables,
    information_schema.columns columns
WHERE 
        columns.table_name = tables.table_name
    AND tables.table_schema = 'public'
    AND tables.table_type = 'BASE TABLE';
