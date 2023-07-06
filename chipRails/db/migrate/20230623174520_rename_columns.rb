class RenameColumns < ActiveRecord::Migration[7.0]
  def change
    rename_column :components, :type, :group

    rename_column :sbomComponents, :type, :group

  end
end
