class ChangeColumnNullSboms < ActiveRecord::Migration[7.0]
  def change
    change_column_null :sboms, :user_id, true
  end
end
