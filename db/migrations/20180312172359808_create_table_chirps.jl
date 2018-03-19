module CreateTableChirps

import Migration: create_table, column, column_id, add_index, drop_table

function up()
  create_table(:chirps) do
    [
      column_id()
      column(:content, :text)
      column(:created_at, :datetime)
    ]
  end

  add_index(:chirps, :created_at)
end

function down()
  drop_table(:chirps)
end

end
